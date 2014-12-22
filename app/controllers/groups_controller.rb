class GroupsController < ApplicationController
  respond_to :json

  def index
    respond_with(@groups = Group.all)
    # respond_with(Group.all)
  end
end
