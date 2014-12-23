class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.string :description
      t.text :address

      t.userstamps
      t.timestamps
    end
  end
end
