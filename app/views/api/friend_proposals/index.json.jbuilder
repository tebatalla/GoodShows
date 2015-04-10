json.array! @friend_proposals do |friend_proposal|
  json.extract! friend_proposal, :id, :email, :friend_proposals
end