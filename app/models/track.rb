class Track < ActiveRecord::Base
  belongs_to :driver

  after_create :update_trip

  def update_trip
    attributes = self.attributes.clone

    attributes = attributes.except('id', 'front_img_url', 'rear_img_url', 'video_url', 'front_video_url', 'rear_video_url', 'audio_url', 'speed')

    trip = Trip.where(driver_id: attributes['driver_id'], start_time: attributes['start_time']).first_or_create(attributes)
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


# Sample Code
  # polygon = [
  #   Geokit::LatLng.new(0,0),
  #   Geokit::LatLng.new(10,0),
  #   Geokit::LatLng.new(10,10),
  #   Geokit::LatLng.new(20,10),
  #   Geokit::LatLng.new(20,0),
  #   Geokit::LatLng.new(30,0),
  #   Geokit::LatLng.new(30,20),
  #   Geokit::LatLng.new(0,20)
  # ]
# point = Geokit::LatLng.new(5,5)
# polygon.contains?(point) # => true

  end
end
