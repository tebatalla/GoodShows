# == Schema Information
#
# Table name: show_shelves
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ShowShelf < ActiveRecord::Base
  validates :owner_id, :title, presence: true
  validates :title, uniqueness: { scope: :owner_id }
  belongs_to :user, class_name: 'User', foreign_key: :owner_id
end
