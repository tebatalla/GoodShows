json.array! @friend_proposals do |friend_proposal|
  json.partial! 'api/friend_proposals/show', friend_proposal: friend_proposal
  json.partial! 'api/users/show', user: friend_proposal.requested
end