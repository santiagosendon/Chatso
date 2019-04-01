class MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def show
    @message = Message.find(params[:id])
    render json: @message
  end

  def create
    @message = Message.new(content: params[:content], user_id: params[:user_id], chat_id: params[:chat_id])
    if @message.save
      render json: @message
    else
      render json: {error: "Unable to create message."}, status: 400
    end
  end
end
