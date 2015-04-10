json.array! @shelves do |shelf|
  json.extract! shelf, :id, :title, :owner_id, :created_at, :updated_at
  json.shows(shelf.shows) do |show|
    json.partial! 'show_shelves/show', show: show, shelf: shelf
  end
end 