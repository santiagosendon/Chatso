class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :url

  has_many :user_chats
  has_many :chats, through: :user_chats
    # class ChatSerializer < ActiveModel::Serializer
    #   attributes :id
    #
    #   has_many :users, through: :user_chats
    #   has_many :messages
    #
    # end
end
