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
#  file_url        :string           default("https://www.filepicker.io/api/file/uI0gnDYKTO2cMbhpKjus"), not null
#

FactoryGirl.define do
  factory :user do
    email "MyString"
password_digest "MyString"
session_token "MyString"
  end

end
