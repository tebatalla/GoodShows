Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  root to: 'static_pages#index'

  namespace :api, defaults: { format: :json }  do
    resources :users, only: [:show, :update] do
      member do
        get :friends
      end
    end
    get '/profile', to: 'users#show'
    resources :show_shelves, only: [:show, :index, :create, :destroy]
    get '/show_shelves_all', to: 'show_shelves#all_shelf'
    resources :shows, only: [:show, :index]
    resources :show_shelvings, only: [:create, :destroy]
    resources :friendships, only: [:destroy]
    get '/friends', to: 'users#friends'
    resources :friend_requests, only: [:index, :destroy]
    resources :friend_proposals, only: [:index, :destroy, :create]
    post '/friend_requests', to: 'friend_requests#accept'
    delete '/remove_show_from_all_shelves', to: 'show_shelvings#remove_show_from_all'
  end
end
