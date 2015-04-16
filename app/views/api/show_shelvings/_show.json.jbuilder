json.shelf do
  json.partial! 'api/show_shelves/show', shelf: shelving.shelf
end
json.show do
  json.partial! 'api/shows/show', show: shelving.show
end