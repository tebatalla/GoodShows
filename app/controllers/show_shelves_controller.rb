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
    @shelf = ShowShelf.find(params[:id])
    render :show
  end
end
