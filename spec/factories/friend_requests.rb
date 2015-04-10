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

FactoryGirl.define do
  factory :friend_request do
    requester_id 1
target_id 1
  end

end
