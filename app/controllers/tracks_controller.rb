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
    @track = Track.create(track_params.except(:front_img, :rear_img, :video))

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

    video = Attachment.create(
      path: track_params[:video],
      on: @track,
      tag: 'video'
    ) if track_params[:video]

    video_file_path = nil
    extract_base_dir = nil
    extract_base_url = nil

    if (video && video.path)
      video_file_path = video.path.current_path
      extract_base_dir = File.join(File.dirname(video_file_path), 'ext')
      extract_base_url = File.join(File.dirname(video.path.url), 'ext')
    end

    @track.update!(
      front_img_url: front_img && front_img.path,
      rear_img_url: rear_img && rear_img.path,
      video_url: video && video.path,
      front_video_url: extract_base_url && File.join(extract_base_url, 'front.mp4'),
      rear_video_url: extract_base_url && File.join(extract_base_url, 'rear.mp4'),
      audio_url: extract_base_url && File.join(extract_base_url, 'audio.mp3')
    ) if front_img || rear_img || video

    system "#{Rails.root.join('video.sh')} #{video_file_path} #{extract_base_dir}" if video_file_path

    respond_with(@track)
  end

private

  def track_params
    params.require(:track).permit(:driver_id, :start_time, :end_time, :speed, :speed_max, :speed_avg, :status, :from_lat, :from_lng, :to_lat, :to_lng, :elapsed, :distance, :front_img, :rear_img, :video, :count_off, :count_idle, :count_slow, :count_normal, :count_fast, :count_speeding)
  end
end


