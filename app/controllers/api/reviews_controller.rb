class Api::ReviewsController < ApplicationController
  def show
    @review = Review.find(params[:id])
    render :show
  end

  def destroy
    
  end

  def create
    @review = current_user.reviews.new(review_params)
    if @review.save
      render :show
    else
      render json: { errors: @review.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def index
    if (params[:user_id])
      @reviews = User.find(params[:user_id]).reviews
    else
      @reviews = current_user.reviews
    end
    render :index
  end

  private

  def review_params
    params.permit(:show_id, :rating, :review)
  end
end
