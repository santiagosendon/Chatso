class User < ApplicationRecord
validates :username, presence: true

  has_many :collections
  has_many :items, through: :collections
end
