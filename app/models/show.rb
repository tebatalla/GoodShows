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

class Show < ActiveRecord::Base
  validates :name, presence: true
  has_many :show_shelvings, class_name: 'ShowShelving'
  has_many :shelves, through: :show_shelvings, source: :shelf

  def self.find_or_get_from_api(id)
    show = Show.find_by_id(id)
    return show if show
    begin
      response = RestClient.get "http://api.themoviedb.org/3/tv/#{id}",
                                params: { 'api_key' => '000110ac013031af0d42ddce25465b9f' }
      attrs = Show.parse_tv_show_api_response(response)
      Show.create(attrs)
    rescue
      nil
    end
  end

  def self.parse_tv_show_api_response(response)
    attrs = JSON.parse(response).select do |attribute|
      Show.column_names.include? attribute
    end

    attrs.map do |attribute, value|
      if value.nil? || (value.kind_of?(Array) && value.empty?)
        [attribute, nil]
      elsif attribute == 'episode_run_time'
        [attribute, value.join(', ')]
      elsif attribute == 'genres' || attribute == 'networks' || attribute == 'created_by'
        [attribute, value.map { |arr| arr['name'] }.join(', ')]
      else
        [attribute, value]
      end
    end.to_h
  end
end
