# RealTalk - A JavaScript webchat app with a Rails API backend!

RealTalk was built as a Module 3 Project at Flatiron School in collaboration with [Ian Harrison (IMH51)](https://github.com/IMH51). The breif was to build a web app with a Rails API backend and a JavaScript based frontend without using any JS libraries. The frontend JavaScript and HTML/CSS is hosted [here](https://github.com/IMH51/realtalk-frontend). Details on how to interect with the webchat will be located there.

## Getting Started

Ruby on Rails is required to run this server.

1. Clone this repo on to your machine.
2. Go into the repo in your terminal and run `rails s`
3. You're up and running!
4. Clone the frontend repo on to your machine
5. Go into your cloned repo and open up realtalk.html in your browser
6. Log in and have fun!

For more interactive and responsive fun, grab a friend and have them clone the frontend and change the `baseUrl` in the `.js` file to the your IP address (or wherever you choose to host this server).

###

We have seeded our API with 2 initial users, "jack" and "ian". You may choose to log in to any of them to see how it all looks!


To view the API, you can visit:

 - http://localhost:3000/users - To view existing user's name, url, and chats

 - http://localhost:3000/chats - To view existing chats and their associated users and messages

 - http://localhost:3000/messages - To view existing messages and their associated users and messages

 - http://localhost:3000/user_chats - To view existing chats and which users are having conversations with each other.
