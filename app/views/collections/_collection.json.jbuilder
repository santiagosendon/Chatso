json.extract! collection, :id, :user_id, :item_id, :name, :brand, :category, :total, :created_at, :updated_at
json.url collection_url(collection, format: :json)
