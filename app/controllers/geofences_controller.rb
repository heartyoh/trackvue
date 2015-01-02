class GeofencesController < ApplicationController
  respond_to :json

  def index
    respond_with(@geofences = Geofence.all)
  end
  
  def create
    geofence = Geofence.where("area = ? and group_id = ?", params[:geofence][:area], params[:geofence][:group_id]).first
    
    if(geofence)
    
      Geofence.transaction do
        geofence.update(lat: params[:geofence][:lat])
        geofence.update(lng: params[:geofence][:lng])
      end
    
      respond_with(geofence)
    else
      @geofence = Geofence.create(geofence_params)
      respond_with(@geofence)
    end
    
  end
  
private

  def geofence_params
    params.require(:geofence).permit(:area, :lat, :lng, :group_id)
  end
  
end
