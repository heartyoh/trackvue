class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.references :driver

      t.datetime :start_time
      t.datetime :end_time # means track_time
      t.integer :elapsed

      t.integer :speed
      t.integer :speed_max
      t.integer :speed_avg

      t.float :from_lat
      t.float :from_lng
      t.float :to_lat
      t.float :to_lng

      t.string :distance

      t.string :status

      t.integer :count_off
      t.integer :count_idle
      t.integer :count_slow
      t.integer :count_normal
      t.integer :count_fast
      t.integer :count_speeding

      t.string :front_img_url
      t.string :rear_img_url

      t.userstamps
      t.timestamps
    end

    # add_foreign_key :tracks, :drivers
    add_index :tracks, [:driver_id, :start_time, :end_time], :unique => true, :name => :idx_tracks_0
  end
end
