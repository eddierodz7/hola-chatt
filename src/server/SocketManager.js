const io = require('./index.js').io
const connectedUser = { }
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')

module.exports = function(socket){
  console.log("Socket Id" + socket.id);
}



io.on(VERIFY_USER, (nickname, cb)=>{
  if(isUser(connectedUser, nickname)){
    cb({ isUser:true, user:null })
  }else{
    cb({ isUser:false, user:createUser({name:nickname})})
  }
})

function addUser(userList, user){
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}


function removeUser(userList, username){
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

function isUser(userList, username){
  return username in userList
}
