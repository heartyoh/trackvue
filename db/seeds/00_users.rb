#encoding: utf-8

User.current_user = User.where(email: 'admin@example.com').first_or_create(
  email: 'admin@example.com',
  password: 'admin123',
  password_confirmation: 'admin123'
)

User.where(email: 'heartyoh@hatiolab.com').first_or_create(
  email: 'heartyoh@hatiolab.com',
  password: 'admin123',
  password_confirmation: 'admin123'
)
