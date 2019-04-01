class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :chat_id, :created_at, :user_id
  # belongs_to :chat
  # belongs_to :user, through: :chats
  # belongs_to :chat
  # belongs_to :user
end
