json.(@shelf, :id, :owner_id, :title, :created_at, :updated_at)
json.shows(@shelf.shows) do |show|
  json.partial! 'api/show_shelves/show', show: show, shelf: @shelf
end