#encoding: utf-8

Group.where(name: 'Arion').first_or_create(
  name: 'Arion',
  description: 'Arion Technology'
)

Group.where(name: 'Joutec').first_or_create(
  name: 'Joutec',
  description: 'Joutec Technology'
)
