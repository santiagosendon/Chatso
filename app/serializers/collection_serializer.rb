class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :user_id,:item_id,:name,:brand,:category, :price
end
