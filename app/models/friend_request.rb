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
  validates :target_id, uniqueness: { scope: :requester_id }
  validate :not_currently_existing_friendship

  belongs_to :requester,
             class_name: 'User',
             foreign_key: :requester_id

  belongs_to :requested,
             class_name: 'User',
             foreign_key: :target_id

  def not_currently_existing_friendship
    if Friendship.where(user_id: requester_id, friend_id: target_id).exists?
      errors.add(:target_id, "You are already friends with this person.")
    end
  end
end
