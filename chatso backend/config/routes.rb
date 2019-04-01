Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :chats, only: [:index, :show, :create]
  resources :users, only: [:index, :show, :create]
  resources :messages, only: [:index, :show, :create]
  resources :user_chats, only: [:index, :show, :create]
end
