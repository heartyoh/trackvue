class AddVideoToAlertAndTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :video_url, :string
    add_column :tracks, :front_video_url, :string
    add_column :tracks, :rear_video_url, :string

    add_column :alerts, :video_url, :string
    add_column :alerts, :front_video_url, :string
    add_column :alerts, :rear_video_url, :string
  end
end
