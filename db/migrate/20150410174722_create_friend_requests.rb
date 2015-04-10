class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :requester_id, null: false
      t.integer :target_id, null: false

      t.timestamps null: false
    end

    add_index :friend_requests, [:requester_id, :target_id], unique: true
  end
end
