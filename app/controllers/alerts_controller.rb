class AlertsController < ApplicationController
  respond_to :json

  def index
    filter = {}
    filter[:driver_id] = params[:driver_id] unless params[:driver_id].blank?
    filter[:trip_start_time] = Time.parse(params[:trip_start_time]) unless params[:trip_start_time].blank?

    sorter = 'alert_time desc';
    unless params[:sort].blank?
      sorters = JSON.parse(params[:sort])
      sorter = sorters.collect { |s| "#{s['property']} #{s['direction']}" }.join(",")
    end

    total = Alert.where(filter).count

    @alerts = {
      alerts: Alert.where(filter).order(sorter).limit(params[:limit]).offset(params[:start]),
      total: total
    }
    respond_with(@alerts)
  end

  def show
    @alert = Alert.find(params[:id])

    respond_with(@alert)
  end

  def create
    @alert = Alert.create(alert_params.except(:video1, :video2, :video3, :video4))

    video1 = Attachment.create(
      path: alert_params[:video1],
      on: @alert,
      tag: 'video1'
    ) if alert_params[:video1]

    video2 = Attachment.create(
      path: alert_params[:video2],
      on: @alert,
      tag: 'video2'
    ) if alert_params[:video2]

    video3 = Attachment.create(
      path: alert_params[:video3],
      on: @alert,
      tag: 'video3'
    ) if alert_params[:video3]

    video4 = Attachment.create(
      path: alert_params[:video4],
      on: @alert,
      tag: 'video4'
    ) if alert_params[:video4]

    @alert.update!(
      video1_url: video1 && video1.path,
      video2_url: video2 && video2.path,
      video3_url: video3 && video3.path,
      video4_url: video4 && video4.path
    ) if video1 || video2 || video3 || video4

    respond_with(@alert)
  end

private

  def alert_params
    params.require(:alert).permit(:driver_id, :trip_start_time, :alert_time, :alert_type, :severity, :value, :lat, :lng, :video1, :video2, :video3, :video4)
  end
end
