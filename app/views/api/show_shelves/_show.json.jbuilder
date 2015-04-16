json.(shelf, :id, :owner_id, :title, :created_at, :updated_at)
json.shelf_owner (current_user.id == shelf.owner_id)
json.default_shelf (ShowShelf::DEFAULT_SHELVES.any? { |e| e == shelf.title })
