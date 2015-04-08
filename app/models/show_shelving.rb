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

class ShowShelving < ActiveRecord::Base
end
