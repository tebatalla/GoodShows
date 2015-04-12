class AddDefaultValueToNameColumnInUsers < ActiveRecord::Migration
  def up
    change_column :users, :name, :string, default: 'User', null: false
  end

  def down
    change_column :users, :name, :string, default: nil, null: nil
  end
end
