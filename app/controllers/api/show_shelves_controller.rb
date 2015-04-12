class Api::ShowShelvesController < ApplicationController
  before_action :ensure_logged_in

  def all_shelf
    @user
    if params[:user_id]
      @user = User.find(params[:user_id])
    else
      @user = current_user
    end
      # N+1 query on show_shelvings
      # @shelvings = User.find(params[:user_id]).show_shelvings.pluck(:id, :created_at, :show_id)
      @shelves = @user.show_shelves.includes(shows: :show_shelvings)
    render :all_shelf
  end

  def index
    if params[:user_id]
      # N+1 query on show_shelvings
      # @shelvings = User.find(params[:user_id]).show_shelvings.pluck(:id, :created_at, :show_id)
      @shelves = User.find(params[:user_id]).show_shelves.includes(shows: :show_shelvings)
    else
      @shelves = current_user.show_shelves.includes(shows: :show_shelvings)
    end
    render :index
  end

  def show
    if params[:user_id]
      @shelf = ShowShelf
        .joins(:user)
        .includes(shows: :show_shelvings)
        .where('users.id' => params[:user_id])
        .find_by_id(params[:id])
    else
      @shelf = ShowShelf.includes(shows: :show_shelvings).find(params[:id])
    end
    if @shelf
      render :show
    else
      render json: { error: "Shelf id for user does not exist" },
             status: :unprocessable_entity
    end
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
    params.permit(:title,:user_id)
  end
end
