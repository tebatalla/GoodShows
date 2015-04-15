class Api::ReviewsController < ApplicationController
  def show
    @review = Review.includes(comments: :author).find(params[:id])
    render :show
  end

  def destroy
    
  end

  def update
    @review = Review.find(params[:id])
    if @review.update_attributes(review_params)
      render :show
    else
      render json: { errors: @review.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def comment
    @review = Review.includes(comments: :author).find(params[:id])
    @comment = Comment.new(commentable: @review,
                           author: current_user,
                           body: comment_params['body'])
    if @comment.save
      render partial: 'api/comments/show', locals: { comment: @comment }
    else
      render json: { errors: @comment.errors.full_messages },
             status: :unprocessable_entity
    end
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
      @reviews = User.find(params[:user_id]).reviews.includes(comments: :author)
    else
      @reviews = current_user.reviews.includes(comments: :author)
    end
    render :index
  end

  private

  def review_params
    params.permit(:show_id, :rating, :review)
  end

  def comment_params
    params.permit(:body)
  end
end
