class ChatsController < ApplicationController
  def index
    @chats = Chat.all
    render json: @chats
  end

  def show
    @chat = Chat.find(params[:id])
    render json: @chat
  end

  def create
    @chat = Chat.new()
    if @chat.save
      render json: @chat
    else
      render json: {error: "Unable to create chat."}, status: 400
    end
  end
end
