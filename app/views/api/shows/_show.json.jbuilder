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

user_rating = show.reviews.where(author_id: current_user.id)
user_rating = user_rating && user_rating.pluck(:rating).first

json.avg_rating show.reviews.average(:rating)
json.current_user_rating user_rating
