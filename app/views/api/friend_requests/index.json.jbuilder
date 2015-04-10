json.array! @friend_requests do |friend_request|
  json.extract! friend_request, :id, :requester_id, :target_id
  json.partial! 'api/users/show', user: friend_request.requester
end