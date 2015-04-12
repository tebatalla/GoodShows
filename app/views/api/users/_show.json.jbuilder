json.extract! user, :id, :email, :name
json.current_user user.id == current_user.id