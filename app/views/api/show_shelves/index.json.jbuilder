json.array! @shelves do |shelf|
  json.partial! 'api/show_shelves/show', shelf: shelf
  json.shows(shelf.shows) do |show|
    json.partial! 'api/shows/show', show: show, shelf: shelf
    json.date_added show.show_shelvings.find_by_shelf_id(shelf).created_at
    json.shelving_id show.show_shelvings.find_by_shelf_id(shelf).id
    json.show_owner (current_user.id == shelf.owner_id)

    user_rating = show.reviews.where(reviews: { author_id: shelf.owner_id })
    json.user_rating user_rating.first && user_rating.first.rating
  end
end 