json.extract! review, :id, :author_id, :show_id, :rating, :review
json.user do
  json.partial! 'api/users/show', user: review.author
end