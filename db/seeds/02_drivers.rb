#encoding: utf-8

group = Group.where(name: 'Arion').first();

headers, separator = [], ','

File.open(File.dirname(__FILE__) + '/drivers.csv', 'r').each_with_index do |line, index|
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

    driver_img = data[:'driver_img']
    data = data.except(:driver_img)
    vehicle_img = data[:vehicle_img]
    data = data.except(:vehicle_img)

    data[:group_id] = group.id

    driver = Driver.create! data

    driver_img = Attachment.where(on_id: driver.id, on_type: 'Driver', tag: 'driver').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', driver_img)),
      on: driver,
      tag: 'driver'
    )

    vehicle_img = Attachment.where(on_id: driver.id, on_type: 'Driver', tag: 'vehicle').first_or_create(
      path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', vehicle_img)),
      on: driver,
      tag: 'vehicle'
    )

    driver.update!(
      driver_img_url: driver_img.path,
      vehicle_img_url: vehicle_img.path
    )
  end
end
