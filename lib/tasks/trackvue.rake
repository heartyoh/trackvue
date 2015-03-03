namespace :trackvue do
  desc "Detect mismatching tags javascript files"
  
  task :trackvue_export => [:environment] do
    driver = ENV['driver']
    start_date = ENV['start_date'].to_datetime.strftime("%Y-%m-%d")
    url = ENV['url']
    
    tracks = Track.where("driver_id = ? and start_time > ?", driver, start_date)
    alerts = Alert.where("driver_id = ? and alert_time > ?", driver, start_date)
    
    File.open("#{Rails.root}/public/#{driver}.sh", "w+") do |f|
      f.write("#!/bin/bash\n")
      f.write("curl -c cookiefile -d 'user[email]=test@trackvue.com' -d 'user[password]=admin123' http://#{url}/signin\n")
      f.write("cat cookiefile | grep -v ^'# '| grep -v ^$| grep -v POST$|cut -f7 > cookie\n")
      f.write("COOKIE_DATA=`cat cookie`\n\n")
      
      
      tracks.each do |track|
        track_data = "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"track[driver_id]=#{track.driver_id}\" --form \"track[start_time]=#{track.start_time}\" --form \"track[end_time]=#{track.end_time}\" --form \"track[speed]=#{track.speed}\" --form \"track[speed_max]=#{track.speed_max}\" --form \"track[speed_avg]=#{track.speed_avg}\" --form \"track[status]=#{track.status}\" --form \"track[from_lat]=#{track.from_lat}\" --form \"track[from_lng]=#{track.from_lng}\" --form \"track[to_lat]=#{track.to_lat}\" --form \"track[to_lng]=#{track.to_lng}\" --form \"track[elapsed]=#{track.elapsed}\" --form \"track[distance]=#{track.distance}\" --form \"track[count_off]=#{track.count_off}\" --form \"track[count_idle]=#{track.count_idle}\" --form \"track[count_slow]=#{track.count_slow}\" --form \"track[count_normal]=#{track.count_normal}\" --form \"track[count_fast]=#{track.count_fast}\" --form \"track[count_speeding]=#{track.count_speeding}\""
      
        if(!track.front_img_url.nil?)
          track_data += " --form \"track[front_img]=@#{Rails.root}/public#{track.front_img_url};type=image/jpeg\""
        end
        
        if(!track.rear_img_url.nil?)
          track_data += " --form \"track[rear_img]=@#{Rails.root}/public#{track.rear_img_url};type=image/jpeg\""
        end
        
        if(!track.video_url.nil?)
          track_data += " --form \"track[video]=@#{Rails.root}/public#{track.video_url};type=video/mp4\""
        end
        
        track_data += " http://#{url}/tracks.json\n"

        f.write(track_data)
      end
      
      f.write("\n\n\n")
      
      alerts.each do |alert|
        if(alert.front_img_url.nil?)
          alert_data = alert_event("1", alert, url)
        else
          alert_data = alert_event("2", alert, url)
        end
        f.write(alert_data)
      end
      
    end
  end
  
  def alert_event(type, params, url)
    case type
    when "1"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"alert[driver_id]=#{params.driver_id}\" --form \"alert[trip_start_time]=#{params.trip_start_time}\" --form \"alert[alert_time]=#{params.alert_time}\" --form \"alert[alert_type]=#{params.alert_type}\" --form \"alert[severity]=#{params.severity}\" --form \"alert[value]=#{params.value}\" --form \"alert[lat]=#{params.lat}\" --form \"alert[lng]=#{params.lng}\" --form \"alert[video]=@#{Rails.root}/public#{params.video_url};type=video/mp4\" http://#{url}/alerts.json\n"
    when "2"
      return "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"alert[driver_id]=#{params.driver_id}\" --form \"alert[trip_start_time]=#{params.trip_start_time}\" --form \"alert[alert_time]=#{params.alert_time}\" --form \"alert[alert_type]=#{params.alert_type}\" --form \"alert[severity]=#{params.severity}\" --form \"alert[value]=#{params.value}\" --form \"alert[lat]=#{params.lat}\" --form \"alert[lng]=#{params.lng}\" --form \"alert[front_img]=@#{Rails.root}/public#{params.front_img_url};type=image/jpeg\"  --form \"alert[rear_img]=@#{Rails.root}/public#{params.rear_img_url};type=image/jpeg\" --form \"alert[video]=@#{Rails.root}/public#{params.video_url};type=video/mp4\" http://#{url}/alerts.json\n"
    end
  end
  
end
