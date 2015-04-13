json.partial! 'api/reviews/show', review: @review
json.show do
  json.partial! 'api/shows/show', show: @review.show
end