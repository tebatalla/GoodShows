class Api::FriendshipsController < ApplicationController
  before_action :ensure_logged_in
  def destroy
    @friend = current_user.friends.find(params[:id])
    if @friend
      Friendship.destroy_friendship(@friend.id, current_user.id)
      render partial: 'api/users/show', locals: { user: current_user }
    else
      render json: { error: 'Unable to process unfriending' },
             status: :unprocessable_entity
    end
  end
end
