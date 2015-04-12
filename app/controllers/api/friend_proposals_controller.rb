class Api::FriendProposalsController < ApplicationController
  def index
    @friend_proposals = current_user.friend_proposals.includes(:requested)
    render :index
  end

  def destroy
    
  end

  def create
    @friend_proposal = current_user.friend_proposals.new(friend_proposal_params)
    if @friend_proposal.save
      render :show
    else
      render json: { error: 'Friend request unable to process' },
             status: :unprocessable_entity
    end
  end

  private

  def friend_proposal_params
    params.permit(:target_id)
  end
end
