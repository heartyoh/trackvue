class AddTripStartTimeToAlert < ActiveRecord::Migration
  def change
    add_column :alerts, :trip_start_time, :datetime
  end
end
