json.partial! 'api/users/show', user: @user
json.show_shelves @user.show_shelves do |shelf|
  json.extract!(shelf, :id, :title, :owner_id, :created_at, :updated_at)
  json.shows(shelf.shows) do |show|
    json.partial! 'api/show_shelves/show', show: show, shelf: shelf
  end
end
json.friends @user.friends do |friend|
  json.partial! 'api/users/show', user: friend
end
json.friend_proposals @user.friend_proposals do |friend_proposal|
  json.partial! 'api/friend_proposals/show', friend_proposal: friend_proposal
  json.user do
    json.partial! 'api/users/show', user: friend_proposal.requested
  end
end
json.friend_requests @user.friend_requests do |friend_request|
  json.partial! 'api/friend_requests/show', friend_request: friend_request
  json.user do
    json.partial! 'api/users/show', user: friend_request.requester
  end
end