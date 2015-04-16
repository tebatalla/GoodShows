json.extract! user, :id, :email, :name, :file_url, :friends_count
json.current_user user.id == current_user.id