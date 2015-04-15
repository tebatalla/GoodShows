class ChangeDefaultValueForUsersPicture < ActiveRecord::Migration
  def up
    change_column :users, :file_url, :string, default: 'https://www.filepicker.io/api/file/vet4fyS6R3W7VdqnPwt4', null: false
  end

  def down
    change_column :users, :file_url, :string, null: false, default: "https://www.filepicker.io/api/file/uI0gnDYKTO2cMbhpKjus"
  end
end
