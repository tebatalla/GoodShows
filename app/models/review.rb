# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  show_id    :integer          not null
#  rating     :integer
#  review     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ActiveRecord::Base
  validates :author_id, :show_id, presence: true
  validates :author_id, uniqueness: { scope: :show_id }
  validates :rating, numericality: { less_than_or_equal_to: 5, allow_nil: true }
  belongs_to :show
  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'

  has_many :comments, as: :commentable, dependent: :destroy

  default_scope { order('reviews.updated_at DESC') }
end
