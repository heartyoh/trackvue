class TracksController < ApplicationController

  respond_to :json

  def index
    filter = {}
    filter[:driver_id] = params[:driver_id] if params[:driver_id]
    filter[:start_time] = Time.parse(params[:start_time]) if params[:start_time]

    respond_with(@tracks=Track.where(filter))
  end

  def show
    @track = Track.find(track_params[:id])

    address = Geocoder.search("#{@track.to_lat}, :#{@track.to_lng}")
    formatted_address = address.first.formatted_address if address.length > 0

    respond_with(@track.attributes.merge({address: formatted_address}))
  end

  def create
    # front_img_param = track_params[:front_img]
    # rear_img_param = track_params[:rear_img]

    @track = Track.create(track_params.except(:front_img, :rear_img))

    front_img = Attachment.create(
      path: track_params[:front_img],
      on: @track,
      tag: 'front'
    ) if track_params[:front_img]

    rear_img = Attachment.create(
      path: track_params[:rear_img],
      on: @track,
      tag: 'rear'
    ) if track_params[:rear_img]

    @track.update!(
      front_img_url: front_img && front_img.path,
      rear_img_url: rear_img && rear_img.path
    ) if front_img || rear_img

    respond_with(@track)
  end

private

  def track_params
    params.require(:track).permit(:driver_id, :start_time, :end_time, :speed, :speed_max, :speed_avg, :status, :from_lat, :from_lng, :to_lat, :to_lng, :elapsed, :distance, :front_img, :rear_img)
  end
end
