json.array! @data do |item|
  json.user do
    json.partial! 'api/users/show', user: User.find(item.user_id)
  end
  json.type item.type
  if item.type == "Review"
    json.review do
      json.partial! 'api/reviews/show', review: Review.find(item.item_id)
    end
  elsif item.type == 'Comment'
    comment = Comment.find(item.item_id)
    json.comment do
      json.partial! 'api/comments/show', comment: comment
      json.review do
        json.partial! 'api/reviews/show', review: comment.commentable
      end
    end
  elsif item.type == 'Shelving'
    json.shelving do
      json.partial! 'api/show_shelvings/show', shelving: ShowShelving.find(item.item_id)
    end
  else
    json.extract! item, :user_id, :type, :item_id, :updated_at
  end
end