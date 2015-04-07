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

FactoryGirl.define do
  factory :show_shelf do
    owner_id 1
title "MyString"
  end

end
