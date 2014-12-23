#encoding: utf-8

driver = Driver.first();

headers, separator = [], ','

File.open(File.dirname(__FILE__) + '/tracks.csv', 'r').each_with_index do |line, index|
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
    data = data.except(:front_img)
    rear_img = data[:rear_img]
    data = data.except(:rear_img)

    data[:driver_id] = driver.id

    track = Track.create! data

    front_img_file = Attachment.where(on_id: track.id, on_type: 'Track', tag: 'front').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', front_img)),
      on: track,
      tag: 'front'
    ) unless front_img.empty?

    rear_img_file = Attachment.where(on_id: track.id, on_type: 'Track', tag: 'rear').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', rear_img)),
      on: track,
      tag: 'rear'
    ) unless rear_img.empty?

    track.update!(
      front_img_url: front_img_file && front_img_file.path,
      rear_img_url: rear_img_file && rear_img_file.path
    ) if front_img_file || rear_img_file

  end
end
