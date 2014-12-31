class DriversController < ApplicationController
  respond_to :json

  def index
    respond_with(@drivers = Driver.order(:id).all)
  end

  def create
    @driver = Driver.create(driver_params)

    respond_with(@driver)
  end

  def show
  end
  
private

  def driver_params
    params.require(:driver).permit(:group_id, :lastname, :firstname, :email, :home, :vehicle_name, :car_model, :speed_slow, :speed_normal, :speed_fast)
  end
end
