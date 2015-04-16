class AddCounterColumns < ActiveRecord::Migration
  def up
    add_column :users, :friends_count, :integer, default: 0, null: false
    add_column :show_shelves, :show_shelvings_count, :integer, default: 0, null: false

    ids = Set.new
    Friendship.all.each { |c| ids << c.user_id }
    ids.each do |user_id|
      User.reset_counters(user_id, :friendships)
    end

    shows = Set.new
    ShowShelving.all.each { |c| shows << c.shelf_id }
    shows.each do |shelf_id|
      ShowShelf.reset_counters(shelf_id, :show_shelvings)
    end
  end

  def down
    remove_column :users, :friends_count
    remove_column :show_shelves, :shows_count
  end
end
