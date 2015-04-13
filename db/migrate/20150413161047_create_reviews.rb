class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :author_id, null: false, index: true
      t.integer :show_id, null: false, index: true
      t.integer :rating, null: false
      t.text :review

      t.timestamps null: false
    end

    add_index :reviews, [:author_id, :show_id], unique: true
  end
end
