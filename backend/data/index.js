const conn = require("./connection");
const Room = require("./room");
const User = require("./user");

const db = {
  conn,
  Room,
  User
};


module.exports = db;
