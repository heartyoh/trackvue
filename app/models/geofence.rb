class Geofence < ActiveRecord::Base
  stampable
  
  belongs_to :group
end
