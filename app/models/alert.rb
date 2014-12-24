class Alert < ActiveRecord::Base
  belongs_to :driver

  attr_accessor :driver_name, :vehicle_name

  def driver_name
    "#{self.driver.firstname} #{self.driver.lastname}"
  end

  def vehicle_name
    "#{self.driver.vehicle_name}"
  end
end
