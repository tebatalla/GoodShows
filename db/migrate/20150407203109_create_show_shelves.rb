class CreateShowShelves < ActiveRecord::Migration
  def change
    create_table :show_shelves do |t|
      t.integer :owner_id, null: false, index: true
      t.string :title, null: false

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
