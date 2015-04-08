# == Schema Information
#
# Table name: shows
#
#  id                 :integer          not null, primary key
#  name               :string           not null
#  overview           :text
#  poster_path        :string
#  genres             :string
#  episode_run_time   :string
#  homepage           :string
#  number_of_episodes :integer
#  number_of_seasons  :integer
#  networks           :string
#  last_air_date      :date
#  in_production      :boolean
#  first_air_date     :date
#  created_by         :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'rails_helper'

RSpec.describe Show, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
