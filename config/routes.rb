Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resources :show_shelves, only: [:show, :index]
  resource :session, only: [:new, :create, :destroy]
  root to: 'static_pages#index'
end
