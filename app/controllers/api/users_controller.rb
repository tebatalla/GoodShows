class Api::UsersController < ApplicationController
  before_action :ensure_logged_in

  def show
    if params[:id]
      @user = User.includes(:friends,
        show_shelves: :shows,
        friend_requests: :requester,
        friend_proposals: :requested).find(params[:id])
    else
      @user = User.includes(:friends,
        show_shelves: :shows,
        friend_requests: :requester,
        friend_proposals: :requested).find_by_session_token(session[:session_token])
    end
    render :show
  end

  def friends
    if params[:id]
      @friends = User.find(params[:id]).friends
    else
      @friends = current_user.friends
    end
    render :friends
  end
end
