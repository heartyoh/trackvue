class AlertsController < ApplicationController
  respond_to :json

  def index
    respond_with(@alerts=Alert.all)
  end

  def show
    @alert = Alert.find(params[:id])

    respond_with(@alert)
  end

  def create
  end
end
