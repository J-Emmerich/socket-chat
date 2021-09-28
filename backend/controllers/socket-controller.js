const { Room, User } = require("../data/index");
const formatMessage = require("../utils/messages");
const chatBot = "chatBot";

async function chatMessage(io, socket, msg) {
  try {
   
    const formatedMessage = formatMessage(socket.currentUser.username, msg);
    io.to(socket.currentUser.currentRoom).emit("message", formatedMessage);
   
    const room = await Room.findById(socket.currentUser.currentRoom);
    room.messages.push(formatedMessage);
    await room.save();
  } catch (err) {
    console.log("error in pushing", err.message);
  }
}

async function disconnectUser(room, username) {
  
  try{
    //clean DB
       const roomInDB = await Room.findOne({name: room});
        roomInDB.users = roomInDB.users.filter(
          (roomUser) => roomUser.username !== username);
          await roomInDB.save();
      
        } 
      
      catch(err){
        console.log(err.message)
      }
}

async function joinRoom(io, socket, { username, room }) {
  try {
  
    let user = await User.findOne({ username: username });
    if (!user) {
      user = await User.create({ username: username });
    }
    let roomInDB = await Room.findOne({ name: room });
    if (!roomInDB) {
      roomInDB = await Room.create({ name: room, messages: [] });
    }
    user.currentSocket = socket.id;
    user.currentRoom = roomInDB._id;
    user = await user.save();
    roomInDB.users.push(user);
    roomInDB = await roomInDB.save();
    //Save the username as a property of the socket to retrieve elsewhere
    socket.currentUser = user;
    socket.join(user.currentRoom);
    io.in(user.currentRoom).emit("users_in_room", roomInDB.users);
    io.in(user.currentRoom).emit("room_history", roomInDB.messages);
    socket.emit("current_room", roomInDB._id);
    socket.emit("message", formatMessage(chatBot, "Welcome to the chat"));
    socket.broadcast
      .to(user.currentRoom)
      .emit(
        "message",
        formatMessage(chatBot, `${user.username} entered the chat`)
      );
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  chatMessage,
  disconnectUser,
  joinRoom,
};
