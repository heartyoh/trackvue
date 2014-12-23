class GroupsController < ApplicationController
  respond_to :json

  def index
    respond_with(@groups = Group.all)
  end
end
