json.array! @friend_requests do |friend_request|
  json.extract! friend_request, :id, :email, 'friend_requests.id'
end