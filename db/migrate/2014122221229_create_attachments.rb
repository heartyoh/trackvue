class CreateAttachments < ActiveRecord::Migration
  def	change
    create_table :attachments  do |t|
      t.string :name, :null => false
      t.string :description
      t.string :mimetype
      t.integer :file_size
      t.string :path
      t.references :on, :polymorphic => true
      t.string :tag
      t.userstamps
      t.timestamps
    end

  	add_index :attachments, [:on_type, :on_id, :tag, :name], :unique => true, :name => :idx_attach_0
  end
end
