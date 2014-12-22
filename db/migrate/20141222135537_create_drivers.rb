class CreateDrivers < ActiveRecord::Migration
  def change
    create_table :drivers do |t|
      t.string :lastname
      t.string :firstname
      t.string :email
      t.references :group
      t.string :vehicle_name
      t.string :car_model
      t.float :speed_slow
      t.float :speed_normal
      t.float :speed_fast
      t.text :address
      t.string :vehicle_img_url
      t.string :driver_img_url

      t.userstamps
      t.timestamps
    end
  end
end
