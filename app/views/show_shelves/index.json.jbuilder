json.show_shelves @shelves do |shelf|
  json.extract! shelf, :id, :title, :owner_id 
end 