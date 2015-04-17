shows = []

json.id 0
json.owner_id @user.id
json.title 'All'
json.shelf_owner current_user.id == @user.id
json.default_shelf true
@shelves.each do |shelf|
  shows << shelf.shows
end
json.shows shows.flatten do |show|
  json.partial! 'api/shows/show', show: show
  json.show_owner (current_user.id == @user.id)
  user_rating = show.reviews.where(reviews: { author_id: @user.id })
  json.user_rating user_rating.first && user_rating.first.rating
end