class ShowShelvingsController < ApplicationController
  def create
    @show_shelving = ShowShelving.new(show_shelvings_params)
    if @show_shelving.save
      render json: @show_shelving
    else
      render json: @show_shelving.errors
    end
  end

  def destroy
    @show_shelving = ShowShelving.find(params[:id])
    @show_shelving.destroy
    render json: @show_shelving
  end

  def remove_show_from_all
    @show_shelvings = ShowShelving.joins(:user)
                      .where('users.id' => current_user)
                      .where('show_id' => params[:show_id])
    @show_shelvings.destroy_all
    render json: @show_shelvings
  end

  private

  def show_shelvings_params
    params.permit(:shelf_id, :show_id)
  end
end
