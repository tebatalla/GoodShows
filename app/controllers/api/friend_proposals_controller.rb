class Api::FriendProposalsController < ApplicationController
  def index
    @friend_proposals = current_user.friend_proposals.includes(:requested)
    render :index
  end

  def destroy
    
  end

  def accept
    
  end
end
