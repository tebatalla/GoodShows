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
#  name            :string           default("User"), not null
#  file_url        :string           default("https://www.filepicker.io/api/file/vet4fyS6R3W7VdqnPwt4"), not null
#  friends_count   :integer          default(0), not null
#

require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
