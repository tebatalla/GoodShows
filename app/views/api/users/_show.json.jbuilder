json.extract! user, :id, :email, :name, :file_url
json.current_user user.id == current_user.id