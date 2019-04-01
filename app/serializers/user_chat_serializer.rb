class UserChatSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chat_id
  # has_many :users
  # has_many :messages
  # belongs_to :user
  # belongs_to :chat
end
