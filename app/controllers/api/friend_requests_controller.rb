class Api::FriendRequestsController < ApplicationController
  def index
    @friend_requests = current_user.friend_requests.includes(:requester)
    render :index
  end

  def create
    
  end

  def accept
    
  end

  def destroy
    
  end
end
