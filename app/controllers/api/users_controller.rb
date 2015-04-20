class Api::UsersController < ApplicationController
  before_action :ensure_logged_in

  def show
    if params[:id]
      @user = User.includes(:friends,
        reviews: [{ comments: :author }, :show],
        show_shelves: { shows: [{ reviews: :author }, :show_shelvings] },
        friend_requests: :requester,
        friend_proposals: :requested).find(params[:id])
    else
      @user = User.includes(:friends,
        reviews: [{ comments: :author }, :show],
        show_shelves: { shows: [{ reviews: :author }, :show_shelvings] },
        friend_requests: :requester,
        friend_proposals: :requested).find_by_session_token(session[:session_token])
    end
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.id == current_user.id
      @user = current_user
      @user.update_attributes(api_user_params)
      render :show
    else
      render json: { error: "You must login as this user" }, status: :forbidden
    end
  end

  def index
    @users = User.includes(:friends,
        reviews: [{ comments: :author }, :show],
        show_shelves: { shows: [{ reviews: :author }, :show_shelvings] },
        friend_requests: :requester,
        friend_proposals: :requested).all.where.not(id: current_user.id)
    render :index
  end

  def friends
    if params[:id]
      @friends = User.find(params[:id]).friends
    else
      @friends = current_user.friends
    end
    render :friends
  end

  def reviews
    
  end

  def feed
    page_offset = params[:page].to_i * 10
    @data =  User.find_by_sql([<<-SQL, { user_id: params[:id], page_offset: page_offset }])
      SELECT
        reviews.author_id AS user_id,
        'Review' AS type,
        reviews.id AS item_id,
        reviews.updated_at AS updated_at
      FROM
        reviews
      WHERE
        reviews.author_id = :user_id
      UNION
      SELECT
        show_shelves.owner_id AS user_id,
        'Shelving' AS type,
        show_shelvings.id AS item_id,
        show_shelvings.updated_at AS updated_at
      FROM
        show_shelves
      JOIN
        show_shelvings ON show_shelvings.shelf_id = show_shelves.id
      WHERE
        show_shelves.owner_id = :user_id
      UNION
      SELECT
        comments.author_id AS user_id,
        'Comment' AS type,
        comments.id AS item_id,
        comments.updated_at AS updated_at
      FROM
        comments
      WHERE
        comments.author_id = :user_id
      ORDER BY
        updated_at DESC
      LIMIT 10
      OFFSET :page_offset;
      SQL

    render template: 'api/home_feed/index'
  end

  private

  def api_user_params
    params.require(:user).permit(:name, :file_url, :page)
  end
end
