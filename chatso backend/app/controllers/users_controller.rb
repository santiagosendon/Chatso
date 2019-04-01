class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(name: params[:name], url: params[:url])
    if @user.save
      render json: @user
    else
      render json: {error: "Unable to create user."}, status: 400
    end
  end
end
