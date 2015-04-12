class AddUserImages < ActiveRecord::Migration
  def change
    add_column :users, :file_url, :string
  end
end
