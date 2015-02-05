class AlertsController < ApplicationController
  respond_to :json

  def index
    filter = {}
    filter[:driver_id] = params[:driver_id] if params[:driver_id]
    filter[:trip_start_time] = Time.parse(params[:trip_start_time]) if params[:trip_start_time]

    respond_with(@alerts=Alert.where(filter).order(alert_time: :desc))
  end

  def show
    @alert = Alert.find(params[:id])

    respond_with(@alert)
  end

  def create
    @alert = Alert.create(alert_params.except(:front_img, :rear_img, :video))

    front_img = Attachment.create(
      path: alert_params[:front_img],
      on: @alert,
      tag: 'front'
    ) if alert_params[:front_img]

    rear_img = Attachment.create(
      path: alert_params[:rear_img],
      on: @alert,
      tag: 'rear'
    ) if alert_params[:rear_img]

    video = Attachment.create(
      path: alert_params[:video],
      on: @alert,
      tag: 'video'
    ) if alert_params[:video]

    video_file_path = nil
    extract_base_dir = nil
    extract_base_url = nil

    if (video && video.path)
      video_file_path = video.path.current_path
      extract_base_dir = File.join(File.dirname(video_file_path), 'ext')
      extract_base_url = File.join(File.dirname(video.path.url), 'ext')
    end

    @alert.update!(
      front_img_url: front_img && front_img.path,
      rear_img_url: rear_img && rear_img.path,
      video_url: video && video.path,
      front_video_url: extract_base_url && File.join(extract_base_url, 'front.mp4'),
      rear_video_url: extract_base_url && File.join(extract_base_url, 'rear.mp4'),
      audio_url: extract_base_url && File.join(extract_base_url, 'audio.mp3')
    ) if front_img || rear_img || video

    exec "#{Rails.root.join('video.sh')} #{video_file_path} #{extract_base_dir}" if video_file_path

    respond_with(@alert)
  end

private

  def alert_params
    params.require(:alert).permit(:driver_id, :trip_start_time, :alert_time, :alert_type, :severity, :value, :lat, :lng, :front_img, :rear_img, :video)
  end
end
