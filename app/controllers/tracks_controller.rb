class TracksController < ApplicationController
  respond_to :json

  def index
    respond_with(@tracks=Track.all)
  end

  def show
    @track = Track.find(params[:id])

    address = Geocoder.search("#{@track.to_lat}, #{@track.to_lng}")
    formatted_address = address.first.formatted_address if address.length > 0

    respond_with(@track.attributes.merge({address: formatted_address}))
  end

  def create
  end
end
