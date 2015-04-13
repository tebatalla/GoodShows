class Api::ShowsController < ApplicationController
  before_action :ensure_logged_in
  
  def show
    @show = Show.includes(reviews: :author).find_or_get_from_api(params[:id])
    render :show
  end

  def index
    if params[:shelf_id]
      @shows = Shelf.find(params[:shelf_id]).shows.includes(reviews: :author)
    elsif params[:user_id]
      @shows = User.find(params[:user_id]).shows.includes(reviews: :author)
    else
      @shows = current_user.shows
    end
    render :index
  end

  def reviews
    
  end
end
