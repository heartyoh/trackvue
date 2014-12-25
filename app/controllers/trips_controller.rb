class TripsController < ApplicationController
  respond_to :json

  def index
    filter = {}
    filter[:driver_id] = params[:driver_id] if params[:driver_id]

    respond_with(@trips=Trip.where(filter))
  end

  def show
    @trip = Trip.find(params[:id])

    from_address = Geocoder.search("#{@trip.from_lat}, #{@trip.from_lng}")
    formatted_from_address = from_address.first.formatted_address if from_address.length > 0

    to_address = Geocoder.search("#{@trip.to_lat}, #{@trip.to_lng}")
    formatted_to_address = to_address.first.formatted_address if to_address.length > 0

    respond_with(@trip.attributes.merge({
      from_address: formatted_from_address,
      to_address: formatted_to_address
    }))
  end
end
