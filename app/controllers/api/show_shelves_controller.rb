class ShowShelvesController < ApplicationController
  def index
    if params[:user_id]
      @shelves = User.find(params[:user_id]).show_shelves.includes(:shows, :show_shelvings)
    else
      @shelves = current_user.show_shelves.includes(:shows, :show_shelvings)
    end
    render :index
  end

  def show
    @shelf = ShowShelf.includes(:shows, :show_shelvings).find(params[:id])
    render :show
  end

  def create
    @shelf = current_user.show_shelves.new(shelf_params)
    if @shelf.save
      render :show
    else
      render :show
    end
  end

  def destroy
    @shelf = ShowShelf.find(params[:id])
    @shelf.destroy
    render json: @shelf
  end

  private

  def shelf_params
    params.permit(:title)
  end
end
