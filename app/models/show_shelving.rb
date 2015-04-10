# == Schema Information
#
# Table name: show_shelvings
#
#  id         :integer          not null, primary key
#  shelf_id   :integer
#  show_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ShowShelving < ActiveRecord::Base
  validates :shelf_id, :show_id, presence: true
  validates :show_id, uniqueness: { scope: :shelf_id }
  belongs_to :shelf, foreign_key: :shelf_id, class_name: 'ShowShelf'
  belongs_to :show
  has_one :user, through: :shelf, source: :user

  default_scope { order("created_at") }
end
