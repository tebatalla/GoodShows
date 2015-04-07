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

require 'rails_helper'

RSpec.describe ShowShelf, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
