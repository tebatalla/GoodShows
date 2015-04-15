json.extract! comment, :id, :body, :author_id, :updated_at
json.author do
  json.partial! 'api/users/show', user: comment.author 
end