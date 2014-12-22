class Driver < ActiveRecord::Base
  stampable

  has_many :photos, as: :on

end
