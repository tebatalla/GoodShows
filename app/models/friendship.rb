# == Schema Information
#
# Table name: friendships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Friendship < ActiveRecord::Base
  validates :user_id, :friend_id, presence: true
  validate :cannot_friend_self
  validates :user_id,
            uniqueness: { scope: :friend_id,
                          message: 'You can only friend a person once' }
  belongs_to :user, counter_cache: :friends_count
  belongs_to :friend_target, class_name: 'User', foreign_key: :friend_id

  def self.create_friendship(friend, friendee)
    Friendship.transaction do
      Friendship.create(user_id: friend, friend_id: friendee)
      Friendship.create(user_id: friendee, friend_id: friend)
    end
  end

  def self.destroy_friendship(friend, friendee)
    Friendship.transaction do
      Friendship.where(user_id: friend, friend_id: friendee).destroy_all
      Friendship.where(user_id: friendee, friend_id: friend).destroy_all
    end
  end

  def cannot_friend_self
    errors.add(:friend_id, 'You cannot friend yourself') if user_id == friend_id
  end
end
