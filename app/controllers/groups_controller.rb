class GroupsController < ApplicationController
  respond_to :json

  def index
    respond_with(@groups = Group.all)
  end
  
  #
  # POST groups/:id/update_group_address
  #
  def update_group_address
    groups = Group.find(params[:id])
    
    Group.transaction do
      # groups.update(name: params[:name])
      groups.update(description: params[:description])
      groups.update(address: params[:address])
    end
    
    respond_to do |format|
      format.json { render :json => Group.all }
      format.xml { render :xml => Group.all }
    end
  end
  
end
