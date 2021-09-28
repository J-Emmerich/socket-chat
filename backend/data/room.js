const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  id: String,
  name: String,
  users: [{ id: String, username: String }],
  messages: [{ id: String, user: String, message: String, time: String }]
});

roomSchema.set("toJSON", {
  transform: (doc, received) => {
    received.id = received._id;
  }
});

module.exports = mongoose.model("Room", roomSchema);
