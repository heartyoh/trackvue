#encoding: utf-8

driver = Driver.where(email: 'RicardoRSoltys@rhyta.com').first_or_create(
  firstname: 'Ricardo',
  lastname: 'R. Soltys',
  email: 'RicardoRSoltys@rhyta.com',
  vehicle_name: 'BMW',
  car_model: '2015 BMW i8 Coupe',
  group_id: 1,
  speed_slow: 32,
  speed_normal: 97,
  speed_fast: 121,
  address: 'Hogye 2(i)-dong, Dongan-gu, Anyang-si, Gyeonggi-do, South Korea'
)

driver_img = Attachment.where(on_id: driver.id, on_type: 'Driver', tag: 'driver').first_or_create(
    path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', 'driver.jpeg')),
    on: driver,
    tag: 'driver'
  )

vehicle_img = Attachment.where(on_id: driver.id, on_type: 'Driver', tag: 'vehicle').first_or_create(
    path: File.open(Rails.root.join('app', 'assets', 'images', 'samples', 'vehicle.jpeg')),
    on: driver,
    tag: 'vehicle'
  )

driver.update!(
  driver_img_url: driver_img.path,
  vehicle_img_url: vehicle_img.path
)
