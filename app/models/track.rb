class Track < ActiveRecord::Base
  belongs_to :driver

  after_create :update_trip

  def update_trip
    attributes = self.attributes.clone

    attributes = attributes.except('id', 'front_img_url', 'rear_img_url', 'speed')

    trip = Trip.first_or_initialize(driver_id: attributes['driver_id'], start_time: attributes['start_time'])
    trip.update_attributes!(attributes)

    self.driver.lat = self.to_lat
    self.driver.lng = self.to_lng
    self.driver.status = self.status
    self.driver.speed = self.speed

    # Sync 처리되므로.. 문제임.
    address = Geocoder.search("#{self.to_lat}, #{self.to_lng}")
    formatted_address = address.first.formatted_address if address.length > 0
    self.driver.address = formatted_address

    self.driver.save!
  end
end
