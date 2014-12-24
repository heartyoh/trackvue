class CreateAlerts < ActiveRecord::Migration
  def change
    create_table :alerts do |t|
      t.references :driver, index: true
      t.datetime :alert_time
      t.string :alert_type
      t.string :severity
      t.string :value
      t.float :lat
      t.float :lng

      t.string :front_img_url
      t.string :rear_img_url

      t.userstamps
      t.timestamps
    end
    # add_foreign_key :alerts, :drivers

    add_index :alerts, [:driver_id, :alert_time], :unique => true, :name => :idx_alerts_0

  end
end
