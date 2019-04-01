class UserChatsController < ApplicationController
  def index
    @userchats = UserChat.all
    render json: @userchats
  end

  def show
    @userchat = UserChat.find(params[:id])
    render json: @userchat
  end

  def create
    @userchat = UserChat.new(user_id: params[:user_id], chat_id: params[:chat_id])
    if @userchat.save
      render json: @userchat
    else
      render json: {error: "Unable to create userchat."}, status: 400
    end
  end
end
