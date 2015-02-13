#encoding: utf-8

User.current_user = User.where(email: 'test@trackvue.com').first_or_create(
  email: 'test@trackvue.com',
  password: 'admin123',
  password_confirmation: 'admin123'
)

User.where(email: 'heartyoh@hatiolab.com').first_or_create(
  email: 'heartyoh@hatiolab.com',
  password: 'admin123',
  password_confirmation: 'admin123'
)
