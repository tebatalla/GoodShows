class CreateShowShelvings < ActiveRecord::Migration
  def change
    create_table :show_shelvings do |t|
      t.integer :shelf_id
      t.integer :show_id

      t.timestamps null: false
    end
  end
end
