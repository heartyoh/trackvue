class CreateGeofences < ActiveRecord::Migration
  def change
    create_table :geofences do |t|
      t.integer :area
      t.text :lat
      t.text :lng
      t.references :group

      t.userstamps
      t.timestamps
    end
  end
end
