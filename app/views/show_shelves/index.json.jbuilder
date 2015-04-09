json.array! @shelves do |shelf|
  json.extract! shelf, :id, :title, :owner_id
  json.shows shelf.shows,
  :id,
  :name,
  :poster_path,
  :overview,
  :genres,
  :episode_run_time,
  :homepage,
  :number_of_episodes,
  :number_of_seasons,
  :networks,
  :first_air_date,
  :last_air_date,
  :in_production,
  :created_by
end 