json.friends @friends do |friend|
  json.partial! 'api/users/show', user: friend
end