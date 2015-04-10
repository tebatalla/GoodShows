class Api::FriendRequestsController < ApplicationController
  def index
    @friend_requests = current_user.requesters.includes(:friend_requests)
    render :index
  end

  def create
    
  end

  def accept
    
  end

  def destroy
    
  end
end
