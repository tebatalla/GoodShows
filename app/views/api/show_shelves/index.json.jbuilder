json.array! @shelves do |shelf|
  json.partial! 'api/show_shelves/show', shelf: shelf
  json.shelf_owner
end 