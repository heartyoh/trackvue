class CreateDrivers < ActiveRecord::Migration
  def change
    create_table :drivers do |t|
      t.string :lastname
      t.string :firstname
      t.string :email
      t.string :home
      t.references :group
      t.string :vehicle_name
      t.string :car_model
      t.float :speed_slow
      t.float :speed_normal
      t.float :speed_fast
      t.string :vehicle_img_url
      t.string :driver_img_url

      t.float :lat
      t.float :lng
      t.text :address
      t.string :status
      t.integer :speed

      t.userstamps
      t.timestamps
    end
  end
end
