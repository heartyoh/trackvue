class UsersController < ApplicationController
  respond_to :json

  def index
    respond_with(@users = User.all)
  end

  def create
    @user = User.create(params)

    respond_with(@user)
  end

  def show
  end
end
