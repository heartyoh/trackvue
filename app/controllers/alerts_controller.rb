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
    @alert = Alert.create(alert_params.except(:front_img, :rear_img))

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

    @alert.update!(
      front_img_url: front_img && front_img.path,
      rear_img_url: rear_img && rear_img.path
    ) if front_img || rear_img

    respond_with(@alert)
  end

private

  def alert_params
    params.require(:alert).permit(:driver_id, :trip_start_time, :alert_time, :alert_type, :severity, :value, :lat, :lng, :front_img, :rear_img)
  end
end
