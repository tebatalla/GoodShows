Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resources :show_shelves, only: [:show, :index, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :shows, only: [:show, :index]
  root to: 'static_pages#index'
end
