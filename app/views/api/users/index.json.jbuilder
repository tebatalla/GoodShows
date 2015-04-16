json.array! @users do |user|
  json.partial! 'api/users/show', user: user
  json.current_friend user.friends.include? current_user
  json.pending_proposal user.requesters.include? current_user
  json.pending_request user.desired_friends.include? current_user
  # json.show_shelves user.show_shelves do |shelf|
  #   json.partial! 'api/show_shelves/show', shelf: shelf
  # end
end