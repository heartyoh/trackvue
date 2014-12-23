#encoding: utf-8

Group.where(name: 'Arion').first_or_create(
  name: 'Arion',
  description: 'Arion Technology',
  address: 'Hogye 2(i)-dong, Dongan-gu, Anyang-si, Gyeonggi-do, South Korea'
)

Group.where(name: 'Joutec').first_or_create(
  name: 'Joutec',
  description: 'Joutec Technology',
  address: 'Sunae 1(il)-dong, Bundang-gu, Seongnam-si, Gyeonggi-do, South Korea'
)
