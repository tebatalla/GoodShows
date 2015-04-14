class ChangeReviewsRatingColumn < ActiveRecord::Migration
  def up
    change_column :reviews, :rating, :integer, null: true
  end

  def down
    change_column :reviews, :rating, :integer, null: false
  end
end
