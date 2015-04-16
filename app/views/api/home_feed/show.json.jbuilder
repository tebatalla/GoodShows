json.array! @data do |item|
  json.extract! item, :user_id, :type, :object_id, :updated_at
end