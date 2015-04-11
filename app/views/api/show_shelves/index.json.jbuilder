json.array! @shelves do |shelf|
  json.partial! 'api/show_shelves/show', shelf: shelf
end 