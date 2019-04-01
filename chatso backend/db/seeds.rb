# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

santi = User.create(name: 'Santiago', url: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b2/b28c1d7f3176c12325025d06b0ad88c7000594a3_full.jpg')
steph = User.create(name: 'Stephanie', url: 'https://media.musiciansfriend.com/is/image/MMGS7/PR-150-Acoustic-Guitar-Natural/512457000010000-00-500x500.jpg')

Chat.create()

UserChat.create(user_id: 1, chat_id: 1)
UserChat.create(user_id: 2, chat_id: 1)

Message.create(chat_id: 1, user_id: 2, content: "Testing 123!")
Message.create(chat_id: 1, user_id: 1, content: "This is another test. I am wrting a long string of text to just to see how it will look on the front end. This might not be long enough, I dunno. We shall wait and see...")
