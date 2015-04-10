class Api::UsersController < ApplicationController
  before_action :ensure_logged_in

  def show
    render :show
  end

  def friends
    if params[:id]
      @friends = User.find(:id).friends
    else
      @friends = current_user.friends
    end
    render :index
  end
end
