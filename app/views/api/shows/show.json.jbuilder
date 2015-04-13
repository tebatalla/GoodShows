json.partial! 'api/shows/show', show: @show
json.reviews @show.reviews do |review|
  json.partial! 'api/reviews/show', review: review
end