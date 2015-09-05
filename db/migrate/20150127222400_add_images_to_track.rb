class AddImagesToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :image1_url, :string
    add_column :tracks, :image2_url, :string
    add_column :tracks, :image3_url, :string
    add_column :tracks, :image4_url, :string
  end
end
