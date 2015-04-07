class ShowShelvesController < ApplicationController
  def index
    if params[:user_id]
      @shelves = User.find(params[:user_id]).show_shelves
    else
      @shelves = current_user.show_shelves
    end
    respond_to do |format|
      format.json
    end
  end
end