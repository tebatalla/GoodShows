# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  show_id    :integer          not null
#  rating     :integer          not null
#  review     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ActiveRecord::Base
  validates :author_id, :show_id, :rating, presence: true
  validates :author_id, uniqueness: { scope: :show_id }
  validates :rating, numericality: { less_than_or_equal_to: 5 }
  belongs_to :show
  belongs_to :author,
             foreign_key: :author_id,
             class_name: 'User'
end
