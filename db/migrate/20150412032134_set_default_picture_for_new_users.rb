class SetDefaultPictureForNewUsers < ActiveRecord::Migration
  def up
    change_column :users, :file_url, :string, null: false, default: "https://www.filepicker.io/api/file/uI0gnDYKTO2cMbhpKjus"
  end

  def down
    change_column :users, :file_url, :string, null: nil, default: nil
  end
end
