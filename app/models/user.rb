# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  before_validation :ensure_session_token
  after_create :create_watch_shelf

  has_many :show_shelves,
           class_name: 'ShowShelf',
           foreign_key: :owner_id,
           dependent: :destroy

  has_many :shows, through: :show_shelves, source: :shows

  has_many :friendships,
           class_name: 'Friendship',
           foreign_key: :user_id,
           dependent: :destroy

  has_many :friends, through: :friendships, source: :friend_target

  has_many :friend_proposals,
           class_name: 'FriendRequest',
           foreign_key: :requester_id,
           dependent: :destroy,
           inverse_of: :requester

  has_many :friend_requests,
           class_name: 'FriendRequest',
           foreign_key: :target_id,
           dependent: :destroy,
           inverse_of: :requested

  has_many :desired_friends, through: :friend_proposals, source: :requested, inverse_of: :requesters

  has_many :requesters, through: :friend_requests, source: :requester, inverse_of: :desired_friends

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
    save
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    save
  end

  def password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.password?(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def create_watch_shelf
    show_shelves.create(title: 'Want to Watch')
    show_shelves.create(title: 'Currently Watching')
    show_shelves.create(title: 'Watched')
  end
end
