class Api::FriendProposalsController < ApplicationController
  def index
    @friend_proposals = current_user.desired_friends.includes(:friend_proposals)
    render :index
  end

  def destroy
    
  end

  def accept
    
  end
end
