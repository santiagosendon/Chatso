class User < ApplicationRecord
  has_many :collections
  has_many :items, through: :collections
end
