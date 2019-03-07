class CreateCollections < ActiveRecord::Migration[5.2]
  def change
    create_table :collections do |t|
      t.integer :user_id
      t.integer :item_id
      t.string :name
      t.string :brand
      t.string :category
      t.integer :total

      t.timestamps
    end
  end
end
