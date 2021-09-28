require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");
const jwt = require("jsonwebtoken");
const {SECRET, PORT} = require("./config/config");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*" // <-- React Server
  }
});
const {
  joinRoom,
  disconnectUser,
  chatMessage
} = require("./controllers/socket-controller");
const { registerUser, loginUser, googleVerify } = require("./controllers/auth-controller");
const { User } = require("./data");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
   
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    res.status(200).json(user);
  } catch (err) {
    
    res.status(400).json({ msg: err.message });
  }
});
app.post("/login", async (req, res) => {
  try {
 
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    res.status(200).json(user);
  } catch (err) {
 
    res.status(400).json({ msg: err.message });
  }
});
app.post("/google/auth", async (req, res)=>{
  try{
    // Check if the google token is correct
    const googleToken = await googleVerify(req.body.token);
const user = await User.findOneAndUpdate({username: googleToken.name}, { username: googleToken.name}, {upsert: true, new: true})
const payload = {
  user: user.id,
};
const token = jwt.sign(payload, SECRET);
res.status(200).json({user, token})
  } catch (err){
    res.status(400).json({ msg: err.message });
  }
})
io.use((socket, next) => {
  try {
    const { token } = socket.handshake.query;
    const { user } = socket.handshake.query;
    jwt.verify(token, SECRET, { complete: true });
    socket.userId = user;
    next();
  } catch (err) {
    next(new Error(err.message));
  }
});

io.on("connection", async (socket) => {
  console.log("connected to socket", socket.id)
  socket.on(
    "joinRoom",
    async (response) => await joinRoom(io, socket, response)
  );

  socket.on("chatMessage", async (msg) => {
    await chatMessage(io, socket, msg);
  });
  // When user left send to everyone
  socket.on("disconnect_user", ({ roomId, room, username }) => {
    try {
      socket.broadcast
        .to(roomId)
        .emit(
          "message",
          formatMessage("chatBot", `${username} has left the chat`)
        );
      socket.leave(room);
      disconnectUser(room, username);
    } catch (err) {
      console.log(err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected from socket", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
