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
    
  end

  private

  def show_shelvings_params
    params.permit(:shelf_id, :show_id)
  end
end
