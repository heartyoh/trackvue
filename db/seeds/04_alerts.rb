#encoding: utf-8

headers, separator = [], ','

File.open(File.dirname(__FILE__) + '/alerts.csv', 'r').each_with_index do |line, index|
  if index == 0
    # 첫 번째 라인은 헤더 정보
    headers = line.strip.split(separator).collect{ |header| header.strip.downcase }
  else
    # 두 번째 이상 부터는 데이터
    next if line.strip.empty?
    next if line.strip.starts_with? '#'
    seq = -1
    data = {}
    values = line.split(separator).collect do |v|
      seq += 1
      data[headers[seq].to_sym] = v.strip
    end

    front_img = data[:'front_img']
    rear_img = data[:rear_img]
    video = data[:video]
    data = data.except(:front_img, :rear_img, :video)

    alert = Alert.create! data

    front_img_file = Attachment.where(on_id: alert.id, on_type: 'Alert', tag: 'front').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', front_img)),
      on: alert,
      tag: 'front'
    ) unless front_img.empty?

    rear_img_file = Attachment.where(on_id: alert.id, on_type: 'Alert', tag: 'rear').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', rear_img)),
      on: alert,
      tag: 'rear'
    ) unless rear_img.empty?

    video_file = Attachment.where(on_id: alert.id, on_type: 'Alert', tag: 'video').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'videos', 'samples', video)),
      on: alert,
      tag: 'video'
    ) unless video.empty?

    alert.update!(
      front_img_url: front_img_file && front_img_file.path,
      rear_img_url: rear_img_file && rear_img_file.path,
      video_url: video_file && video_file.path
    ) if front_img_file || rear_img_file || video_file

  end
end
