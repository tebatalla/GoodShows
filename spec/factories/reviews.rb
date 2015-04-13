# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  show_id    :integer          not null
#  rating     :integer          not null
#  review     :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :review do
    author_id 1
show_id 1
rating 1
review "MyText"
  end

end
