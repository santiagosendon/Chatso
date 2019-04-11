// HTML element constants and variables //
// ---------------------- //

const baseUrl = 'http://localhost:3000'
const loginForm = document.querySelector("#login-form")
const usernameInput = document.querySelector("#username-input")
const imageInput = document.querySelector("#image-input")
const loginContainer = document.querySelector("#login-container")
const mainContainer = document.querySelector(".main_container")
const createImageButton = document.querySelector("#create-image-button")
const userChatList = document.querySelector("#user-chat-list")
const messageList = document.querySelector(".messages")
const submitMessageButton = document.querySelector("#message-submit-button")
const messageInput = document.querySelector("#create_message")
let userImage = document.querySelector(".user_image")
let userDisplayName = document.querySelector(".user_display_name")
let chatSearchInput = document.querySelector("#chat_search_input")




const state = {
  users: null,
  current_user: null,
  current_chat: null,
  other_chat_user: null,
}

// Login Page Setup Functions //
//-------------------------//

toggleImageInput = (event) => {
      event.preventDefault()
      imageInput.style.display == 'block' ? imageInput.style.display = 'none' : imageInput.style.display = 'block'
    }

createImageButton.addEventListener("click", toggleImageInput)

loginSetup = () => {
  fetch(baseUrl + "/users")
    .then(response => response.json())
    .then(data => {
      state.users = data
      loginForm.addEventListener("submit", logUserIn)
  })
}

// User Login Functions //
//---------------------//

findOrCreateUser = (event) => {
  currentUser = null
  currentUser = state.users.find(user => user.name == usernameInput.value)
  if (!currentUser) {
    if (!imageInput.value) {
      imageInput.value = "images/user.png"
    }
    createUser().then(data => {
      state.current_user = data
      state.users.push(data)
      loadUserInfo()
    })
  } else {
      state.current_user = currentUser
      loadUserInfo()
    }
  }

/* creates users on the server */
createUser = () => {
  return fetch(baseUrl + "/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: usernameInput.value,
      url: imageInput.value
    })
  }).then(response => response.json())
}

/* API get request to retreive  all chats */
getAllChats = () => fetch(baseUrl + "/user_chats").then(response => response.json())

/* Updates the state with users information */
loadUserInfo = () => {
  userChatList.innerHTML = ""
  userImage.src = state.current_user.url
  userDisplayName.innerText = state.current_user.name
  getAndRenderChatButtons()
  refreshChatIntervalFunction = setInterval(refreshChatButtons, 500)
  }

/* Renders the chats from the api request into the sidebar menu */
getAndRenderChatButtons = () => {
  getAllChats().then(data => {
      allChats = ""
      allChats = JSON.parse(JSON.stringify(data))
      state.current_user.user_chats.forEach(chat => {
        selectedChat = null
        selectedChat = allChats.find(userChat => (userChat.chat_id == chat.chat_id) && (userChat.user_id != state.current_user.id))
        if (selectedChat) {
          otherChatUser = state.users.find(user => user.id == selectedChat.user_id)
          renderChatButtonInMenu(otherChatUser, selectedChat)
        }
      })
    })
}

/* This switches the login-container to the main-container upon logging in */
openRealTalkApp = () => {
  loginContainer.style.display = "none"
  mainContainer.style.display = "flex"
  chatSearchInput.addEventListener('keypress', () => {
    event.preventDefault()
    if (event.keyCode === 13) {
      clearInterval(refreshIntervalFunction)
      findOrCreateNewChat(event)
      clearInterval(refreshChatIntervalFunction)
      loadUserInfo()
    } else {
      chatSearchInput.value += event.key
      }
    })
  }

/* calls on these functions to create or find the current user and log them in */
logUserIn = (event) => {
  event.preventDefault()
  findOrCreateUser(event)
  openRealTalkApp()
}

// Chat Menu Bar Methods //
//----------------------//

/* function for search bar, checks if a user exists, if true, will run the findChat function */
findUser = (event) => {
  event.preventDefault()
  let searchUserResult
  if (chatSearchInput.value) {
    searchUserResult = state.users.find(user => user.name == chatSearchInput.value)
  } else {
    searchUserResult = state.users.find(user => user.name == event.target.innerText)
  }
  if (!searchUserResult) {
    alert("User doesn't exist!")
    if (refreshIntervalFunction) {
      clearInterval(refreshIntervalFunction)
      refreshIntervalFunction = setInterval(refreshChatWindow, 500)
    }
    if (refreshChatIntervalFunction) {
      clearInterval(refreshChatIntervalFunction)
      refreshChatIntervalFunction = setInterval(refreshChatButtons, 500)
    }
  } else {
    state.other_chat_user = searchUserResult
    findChat(event)
  }
  chatSearchInput.value = ""
}

/* finds if there is an existing chat between current user and the found user, if not, create a new one. */
findChat = (event) => {
  state.current_chat = state.other_chat_user.chats.find(otherChat => {
    return state.current_user.chats.find(userChat => otherChat.id == userChat.id)
  })
  if (!state.current_chat) {
    createNewChat()
  } else {
    renderChatInWindow(state.other_chat_user.id )
  }
}

// Create New Chat Method //

createNewChat = () => {
  return fetch(baseUrl+ '/chats', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => {
    state.current_chat = data
    state.current_user.chats.push(data)
    state.other_chat_user.chats.push(data)
    })
  .then(() => {
    return fetch(baseUrl + '/user_chats', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: state.other_chat_user.id,
        chat_id: state.current_chat.id
      })
    })
  })
    .then(response => response.json())
    // .then(data => console.log("new other user chat, ", data))
      .then(() => {
        return fetch(baseUrl + '/user_chats', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: state.current_user.id,
            chat_id: state.current_chat.id
          })
        })
      })
        .then(response => response.json())
        .then(data => {
          renderChatButtonInMenu(state.other_chat_user, state.current_chat)
          renderChatInWindow(state.other_chat_user.id)
        })
}

/*                       */

/* This will render the existing chats in the sidebar */

refreshChatWindow = () => {
  fetch(baseUrl + "/chats/" + state.current_chat.id)
  .then(response => response.json())
  .then(data => {
    baseChat = [...data.messages]
    if (state.current_chat) {
      if (baseChat.length != state.current_chat.messages.length) {
        state.current_chat = JSON.parse(JSON.stringify(data))
        clearInterval(refreshIntervalFunction)
        renderChatInWindow(state.other_chat_user.id)
        }
      }
    })
}


refreshChatButtons = () => {
  // debugger
  fetch(baseUrl + "/users")
  .then(response => response.json())
  .then(data => state.users = JSON.parse(JSON.stringify(data)))
  .then(() => {
    fetch(baseUrl + "/users/" + state.current_user.id)
  .then(response => response.json())
  .then(data => {
    baseUsers = ""
    baseUsers = JSON.parse(JSON.stringify(data))
    if (state.current_user) {
      if (baseUsers.user_chats.length != state.current_user.user_chats.length) {
        state.current_user = ""
        state.current_user = JSON.parse(JSON.stringify(data))
        clearInterval(refreshChatIntervalFunction)
        loadUserInfo()
        userChatList.scrollTo(0, userChatList.scrollHeight)
        }
      }
      if (state.other_chat_user) {
      let currentChatButton = document.querySelector(`#user-chat-list li[data-id="${state.other_chat_user.id}"]`)
      currentChatButton.id = 'active_user'
      }
    })
  })
}

renderChatButtonInMenu = (user, chat) => {
  if (event) {
    let chatId = event.target.dataset.id
  }
  let newButton = document.createElement("li")
  newButton.innerHTML = `<img class="message_usr_image" src="${user.url}"></img>${user.name}`
  newButton.dataset.id = user.id
  if ((state.other_chat_user) && user == state.other_chat_user) {
    newButton.id = "#active_user"
  } else {
    newButton.id = ""
  }
  userChatList.appendChild(newButton)
  newButton.addEventListener("click", (event, chatId) => {
    clearInterval(refreshIntervalFunction)
    clearInterval(refreshChatIntervalFunction)
    let currentButton = document.querySelector("#active_user")
      if (currentButton) {
        currentButton.id = ""
      }
      newButton.id = "active_user"
      state.other_chat_user = user
      state.current_chat = state.current_user.chats.find(userChat => userChat.id == chatId)
      findOrCreateNewChat(event)
  })
}
\
renderChatInWindow = (id) => {
  messageList.innerHTML = ""
    if (state.current_chat) {
      state.current_chat.messages.forEach(renderMessage)
      submitMessageButton.dataset.id = state.current_chat.id
    }
  submitMessageButton.addEventListener("click", createNewMessage)
  let currentActiveButton = document.querySelector('#user-chat-list li#active_user')
    if (currentActiveButton) {
      currentActiveButton.id = ""
    }
  let selectedButton = document.querySelector(`#user-chat-list li[data-id="${state.other_chat_user.id}"]`)
  selectedButton.id = 'active_user'
  messageList.scrollTo(0, messageList.scrollHeight)
  if (state.current_chat) {
  baseChat = [...state.current_chat.messages]
  }
  messageInput.placeholder = `To message ${state.other_chat_user.name}, type your message here then click Send!`
  refreshIntervalFunction = setInterval(refreshChatWindow, 500)
}

findOrCreateNewChat = (event) => {
  event.preventDefault()
  findUser(event)
}
