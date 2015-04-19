class Api::HomeFeedController < ApplicationController
  def index
    @data =  User.find_by_sql([<<-SQL, { user_id: current_user.id }])
      SELECT
        reviews.author_id AS user_id,
        'Review' AS type,
        reviews.id AS item_id,
        reviews.updated_at AS updated_at
      FROM
        reviews
      JOIN
        friendships ON reviews.author_id = friendships.friend_id
      WHERE
        friendships.user_id = :user_id
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
      JOIN
        friendships ON show_shelves.owner_id = friendships.friend_id
      WHERE
        friendships.user_id = :user_id
      UNION
      SELECT
        comments.author_id AS user_id,
        'Comment' AS type,
        comments.id AS item_id,
        comments.updated_at AS updated_at
      FROM
        comments
      JOIN
        friendships ON comments.author_id = friendships.friend_id
      WHERE
        friendships.user_id = :user_id
      ORDER BY
        updated_at DESC
      LIMIT 10;
      SQL

    render :index
  end
end
