# == Schema Information
#
# Table name: friend_requests
#
#  id           :integer          not null, primary key
#  requester_id :integer          not null
#  target_id    :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class FriendRequest < ActiveRecord::Base
  validates :requester_id, :target_id, presence: true

  belongs_to :requester,
             class_name: 'User',
             foreign_key: :requester_id

  belongs_to :requested,
             class_name: 'User',
             foreign_key: :target_id
end
