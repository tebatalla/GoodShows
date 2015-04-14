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

user_review = show.reviews.where(author_id: current_user.id)
user_rating = user_review && user_review.pluck(:rating).first
average_rating = show.reviews.average(:rating)

json.avg_rating average_rating && average_rating.round(2)
json.current_user_rating user_rating
json.current_user_reviewed user_review.first && user_review.first.review && !user_review.first.review.empty?
json.current_user_review_id user_review.first && user_review.first.id