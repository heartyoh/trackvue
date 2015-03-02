class GeneratorsController < ApplicationController
  respond_to :json

  def index
  end
  
  #
  # POST generators/export_data
  #
  def export_data
    driver = params[:generators][:driver_id]
    start_date = params[:generators][:start_date]
    url = params[:generators][:url]
    
    puts start_date
    
    tracks = Track.where("driver_id = ? and start_time > ?", driver, start_date)
    alerts = Alert.where("driver_id = ? and alert_time > ?", driver, start_date)
    
    File.open("/Users/jyp/Desktop/#{driver}.sh", "w+") do |f|
      f.write("#!/bin/bash\n")
      f.write("curl -c cookiefile -d 'user[email]=test@trackvue.com' -d 'user[password]=admin123' http://#{url}/signin\n")
      f.write("cat cookiefile | grep -v ^'# '| grep -v ^$| grep -v POST$|cut -f7 > cookie\n")
      f.write("COOKIE_DATA=`cat cookie`\n")
      
      tracks.each do |track|
        if(track.front_img_url.nil?)
          track_data = tracking_data("1", track, url)
        elsif(track.front_img_url && track.video_url.nil?)
          track_data = tracking_data("2", track, url)
        elsif(track.front_img_url && track.video_url)
          track_data = tracking_data("3", track, url)
        end
        f.write(track_data)
      end
      
      f.write("\n\n\n")
      
      alerts.each do |alert|
        if(alert.front_img_url.nil?)
          alert_data = alert_event("1", alert, url)
        elsif(track.front_img_url && track.rear_img_url)
          alert_data = alert_event("2", alert, url)
        end
        f.write(alert_data)
      end
      
    end
    
    
    
    @results = {:success => true, :message => :success}
    
    respond_to do |format|
      format.json { render :json => @results }
      format.xml { render :xml => @results }
    end
  end
  
  def tracking_data(type, params, url)
    case type
    when "1"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"track[driver_id]=#{params.driver_id}\" --form \"track[start_time]=#{params.start_time}\" --form \"track[end_time]=#{params.end_time}\" --form \"track[speed]=#{params.speed}\" --form \"track[speed_max]=#{params.speed_max}\" --form \"track[speed_avg]=#{params.speed_avg}\" --form \"track[status]=#{params.status}\" --form \"track[from_lat]=#{params.from_lat}\" --form \"track[from_lng]=#{params.from_lng}\" --form \"track[to_lat]=#{params.to_lat}\" --form \"track[to_lng]=#{params.to_lng}\" --form \"track[elapsed]=#{params.elapsed}\" --form \"track[distance]=#{params.distance}\" --form \"track[count_off]=#{params.count_off}\" --form \"track[count_idle]=#{params.count_idle}\" --form \"track[count_slow]=#{params.count_slow}\" --form \"track[count_normal]=#{params.count_normal}\" --form \"track[count_fast]=#{params.count_fast}\" --form \"track[count_speeding]=#{params.count_speeding}\" http://#{url}/tracks.json\n"
    when "2"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"track[driver_id]=#{params.driver_id}\" --form \"track[start_time]=#{params.start_time}\" --form \"track[end_time]=#{params.end_time}\" --form \"track[speed]=#{params.speed}\" --form \"track[speed_max]=#{params.speed_max}\" --form \"track[speed_avg]=#{params.speed_avg}\" --form \"track[status]=#{params.status}\" --form \"track[from_lat]=#{params.from_lat}\" --form \"track[from_lng]=#{params.from_lng}\" --form \"track[to_lat]=#{params.to_lat}\" --form \"track[to_lng]=#{params.to_lng}\" --form \"track[elapsed]=#{params.elapsed}\" --form \"track[distance]=#{params.distance}\" --form \"track[count_off]=#{params.count_off}\" --form \"track[count_idle]=#{params.count_idle}\" --form \"track[count_slow]=#{params.count_slow}\" --form \"track[count_normal]=#{params.count_normal}\" --form \"track[count_fast]=#{params.count_fast}\" --form \"track[count_speeding]=#{params.count_speeding}\" --form \"track[front_img]=@#{Rails.root}/public#{params.front_img_url}\"  --form \"track[rear_img]=@#{Rails.root}/public#{params.rear_img_url};type=image/jpeg\" http://#{url}/tracks.json\n"
    when "3"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"track[driver_id]=#{params.driver_id}\" --form \"track[start_time]=#{params.start_time}\" --form \"track[end_time]=#{params.end_time}\" --form \"track[speed]=#{params.speed}\" --form \"track[speed_max]=#{params.speed_max}\" --form \"track[speed_avg]=#{params.speed_avg}\" --form \"track[status]=#{params.status}\" --form \"track[from_lat]=#{params.from_lat}\" --form \"track[from_lng]=#{params.from_lng}\" --form \"track[to_lat]=#{params.to_lat}\" --form \"track[to_lng]=#{params.to_lng}\" --form \"track[elapsed]=#{params.elapsed}\" --form \"track[distance]=#{params.distance}\" --form \"track[count_off]=#{params.count_off}\" --form \"track[count_idle]=#{params.count_idle}\" --form \"track[count_slow]=#{params.count_slow}\" --form \"track[count_normal]=#{params.count_normal}\" --form \"track[count_fast]=#{params.count_fast}\" --form \"track[count_speeding]=#{params.count_speeding}\" --form \"track[front_img]=@#{Rails.root}/public#{params.front_img_url}\"  --form \"track[rear_img]=@#{Rails.root}/public#{params.rear_img_url};type=image/jpeg\" --form \"track[video]=@#{Rails.root}/public#{params.video_url};type=video/mp4\" http://#{url}/tracks.json\n"
    end
  end
  
  def alert_event(type, params, url)
    case type
    when "1"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"alert[driver_id]=#{params.driver_id}\" --form \"alert[trip_start_time]=#{params.trip_start_time}\" --form \"alert[alert_time]=#{params.alert_time}\" --form \"alert[alert_type]=#{params.alert_type}\" --form \"alert[severity]=#{params.severity}\" --form \"alert[value]=#{params.value}\" --form \"alert[lat]=#{params.lat}\" --form \"alert[lng]=#{params.lng}\" --form \"alert[video]=@#{Rails.root}/public#{params.video_url};type=video/mp4\" http://#{url}/alerts.json\n"
    when "2"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"alert[driver_id]=#{params.driver_id}\" --form \"alert[trip_start_time]=#{params.trip_start_time}\" --form \"alert[alert_time]=#{params.alert_time}\" --form \"alert[alert_type]=#{params.alert_type}\" --form \"alert[severity]=#{params.severity}\" --form \"alert[value]=#{params.value}\" --form \"alert[lat]=#{params.lat}\" --form \"alert[lng]=#{params.lng}\" --form \"alert[front_img]=@#{Rails.root}/public#{params.front_img_url};type=image/jpeg\"  --form \"alert[rear_img]=@#{Rails.root}/public#{params.rear_img_url};type=image/jpeg\" --form \"track[video]=@#{Rails.root}/public#{params.video_url};type=video/mp4\" http://#{url}/alerts.json\n"
    end
  end
  
end
