class ShowsController < ApplicationController
  def show
    @show = Show.find_or_get_from_api(params[:id])
    render :show
  end

  def index
    if params[:shelf_id]
      @shows = Shelf.find(params[:shelf_id]).shows
    elsif params[:user_id]
      @shows = User.find(params[:user_id]).shows
    else
      @shows = current_user.shows
    end
    render json: @shows
  end
end
