json.array! @friend_requests do |friend_request|
  json.partial! 'api/friend_requests/show', friend_request: friend_request
  json.partial! 'api/users/show', user: friend_request.requester
end