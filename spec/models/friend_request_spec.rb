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

require 'rails_helper'

RSpec.describe FriendRequest, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
