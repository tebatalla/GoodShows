# == Schema Information
#
# Table name: show_shelvings
#
#  id         :integer          not null, primary key
#  shelf_id   :integer
#  show_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe ShowShelving, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
