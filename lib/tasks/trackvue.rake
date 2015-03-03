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
        alert_data = "curl -H \"Cookie: _trackvue_session=$COOKIE_DATA\" --form \"alert[driver_id]=#{alert.driver_id}\" --form \"alert[trip_start_time]=#{alert.trip_start_time}\" --form \"alert[alert_time]=#{alert.alert_time}\" --form \"alert[alert_type]=#{alert.alert_type}\" --form \"alert[severity]=#{alert.severity}\" --form \"alert[value]=#{alert.value}\" --form \"alert[lat]=#{alert.lat}\" --form \"alert[lng]=#{alert.lng}\""
        
        if(!alert.front_img_url.nil?)
          alert_data += " --form \"alert[front_img]=@#{Rails.root}/public#{alert.front_img_url};type=image/jpeg\""
        end
        
        if(!alert.rear_img_url.nil?)
          alert_data += "  --form \"alert[rear_img]=@#{Rails.root}/public#{alert.rear_img_url};type=image/jpeg\""
        end
        
        if(!alert.video_url.nil?)
          alert_data += " --form \"alert[video]=@#{Rails.root}/public#{alert.video_url};type=video/mp4\""
        end
        
        alert_data += " http://#{url}/alerts.json\n"
        
        f.write(alert_data)
      end
      
    end
  end
  
end
