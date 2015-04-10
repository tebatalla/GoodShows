json.array! @friend_proposals do |friend_proposal|
  json.extract! friend_proposal, :id, :requester_id, :target_id
  json.partial! 'api/users/show', user: friend_proposal.requested
end