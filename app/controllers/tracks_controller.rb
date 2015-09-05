class TracksController < ApplicationController

  respond_to :json

  def index
    filter = {}
    filter[:driver_id] = params[:driver_id] if params[:driver_id]
    filter[:start_time] = Time.parse(params[:start_time]) if params[:start_time]

    respond_with(@tracks=Track.where(filter).order(:start_time, :end_time))
  end

  def show
    @track = Track.find(track_params[:id])

    address = Geocoder.search("#{@track.to_lat}, :#{@track.to_lng}")
    formatted_address = address.first.formatted_address if address.length > 0

    respond_with(@track.attributes.merge({address: formatted_address}))
  end

  def create
    @track = Track.create(track_params.except(:image1, :image2, :image3, :image4))

    image1 = Attachment.create(
      path: track_params[:image1],
      on: @track,
      tag: 'image1'
    ) if track_params[:image1]

    image2 = Attachment.create(
      path: track_params[:image2],
      on: @track,
      tag: 'image2'
    ) if track_params[:image2]

    image3 = Attachment.create(
      path: track_params[:image3],
      on: @track,
      tag: 'image3'
    ) if track_params[:image3]

    image4 = Attachment.create(
      path: track_params[:image4],
      on: @track,
      tag: 'image4'
    ) if track_params[:image4]

    @track.update!(
      image1_url: image1 && image1.path,
      image2_url: image2 && image2.path,
      image3_url: image3 && image3.path,
      image4_url: image4 && image4.path,
    ) if image1 || image2 || image3 || image4

    respond_with(@track)
  end

private

  def track_params
    params.require(:track).permit(:driver_id, :start_time, :end_time, :speed, :speed_max, :speed_avg, :status, :from_lat, :from_lng, :to_lat, :to_lng, :elapsed, :distance, :front_img, :rear_img, :video, :count_off, :count_idle, :count_slow, :count_normal, :count_fast, :count_speeding, :image1, :image2, :image3, :image4)
  end
end


