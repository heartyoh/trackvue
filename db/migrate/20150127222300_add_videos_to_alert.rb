class AddVideosToAlert < ActiveRecord::Migration
  def change
    add_column :alerts, :video1_url, :string
    add_column :alerts, :video2_url, :string
    add_column :alerts, :video3_url, :string
    add_column :alerts, :video4_url, :string
  end
end
