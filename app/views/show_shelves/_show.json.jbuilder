json.extract! show,
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

json.date_added shelf.show_shelvings.find_by_show_id(show).created_at