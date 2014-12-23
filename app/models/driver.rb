class Driver < ActiveRecord::Base
  stampable

  has_many :photos, as: :on

  belongs_to :group

end
