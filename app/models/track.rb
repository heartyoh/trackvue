class Track < ActiveRecord::Base
  belongs_to :driver

  after_create :update_trip

  def update_trip
    attributes = self.attributes.clone

    attributes = attributes.except('id', 'front_img_url', 'rear_img_url', 'speed')

    debug_print attributes

    trip = Trip.first_or_initialize(driver_id: attributes['driver_id'], start_time: attributes['start_time'])
    trip.update_attributes!(attributes)
  end
end
