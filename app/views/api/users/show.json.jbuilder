json.partial! 'api/users/show', user: @user
json.current_friend @user.friends.include? current_user
json.pending_proposal @user.requesters.include? current_user
json.pending_request @user.desired_friends.include? current_user
json.show_shelves @user.show_shelves do |shelf|
  json.partial! 'api/show_shelves/show', shelf: shelf
end
json.friends @user.friends do |friend|
  json.partial! 'api/users/show', user: friend
end
if current_user == @user
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
end