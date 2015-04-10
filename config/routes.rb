Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  root to: 'static_pages#index'

  namespace :api, defaults: { format: :json }  do
    resources :show_shelves, only: [:show, :index, :create, :destroy]
    resources :shows, only: [:show, :index]
    resources :show_shelvings, only: [:create, :destroy]
    delete '/remove_show_from_all_shelves', to: 'show_shelvings#remove_show_from_all'
  end
end
