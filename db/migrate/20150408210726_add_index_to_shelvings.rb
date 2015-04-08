class AddIndexToShelvings < ActiveRecord::Migration
  def change
    add_index :show_shelvings, [:shelf_id, :show_id], unique: true
  end
end
