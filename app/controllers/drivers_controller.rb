class DriversController < ApplicationController
  respond_to :json

  def index
    respond_with(@drivers = Driver.all)
  end

  def create
    @driver = Driver.create(params)

    respond_with(@driver)
  end

  def show
  end
end
