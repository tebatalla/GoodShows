class ShowShelvesController < ApplicationController
  def index
    if params[:user_id]
      @shelves = User.find(params[:user_id]).show_shelves
    else
      @shelves = current_user.show_shelves
    end
    render json: @shelves
  end

  def show
    if params[:id]
      @shelf = ShowShelf.find(params[:id])
      render :show
    elsif params[:user_id]
      @shelves = User.find(params[:user_id]).show_shelves
      render :show_all, owner_id: params[:user_id]
    else
      @shelves = current_user.show_shelves
      render :show_all, owner_id: current_user
    end
  end
end
