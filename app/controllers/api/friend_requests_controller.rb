class Api::FriendRequestsController < ApplicationController
  def index
    @friend_requests = current_user.friend_requests.includes(:requester)
    render :index
  end

  def accept
    @friend_request = current_user
                      .friend_requests
                      .find_by_requester_id(
                        friend_proposal_params[:requester_id])
    if @friend_request
      @friend = Friendship
                .create_friendship(
                  @friend_request.requester_id,
                  @friend_request.target_id)
      @friend_request.destroy
      render partial: 'api/users/show', locals: { user: @friend }
    else
      render json: { error: 'Friend request unable to process' },
             status: :unprocessable_entity
    end
  end

  def destroy
    
  end

  private

  def friend_proposal_params
    params.permit(:requester_id)
  end
end