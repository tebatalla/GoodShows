Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resources :show_shelves, only: [:show, :index, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :shows, only: [:show, :index]
  resources :show_shelvings, only: [:create, :destroy]
  root to: 'static_pages#index'
  delete '/remove_show_from_all_shelves', to: 'show_shelvings#remove_show_from_all'
end
