class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name,:brand,:image,:category,:price
end
