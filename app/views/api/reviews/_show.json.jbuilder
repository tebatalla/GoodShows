json.extract! review, :id, :author_id, :show_id, :rating, :review, :updated_at
json.user do
  json.partial! 'api/users/show', user: review.author
end
json.comments review.comments do |comment|
  json.partial! 'api/comments/show', comment: comment
end