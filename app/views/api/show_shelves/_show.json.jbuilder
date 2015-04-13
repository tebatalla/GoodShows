json.(shelf, :id, :owner_id, :title, :created_at, :updated_at)
json.shelf_owner (current_user.id == shelf.owner_id)
json.default_shelf (ShowShelf::DEFAULT_SHELVES.any? { |e| e == shelf.title })
json.shows(shelf.shows) do |show|
  json.partial! 'api/shows/show', show: show, shelf: shelf
  json.date_added show.show_shelvings.find_by_shelf_id(shelf).created_at
  json.shelving_id show.show_shelvings.find_by_shelf_id(shelf).id
  json.show_owner (current_user.id == shelf.owner_id)
  json.avg_rating show.reviews.average(:rating)
  json.user_rating @user_rating
end