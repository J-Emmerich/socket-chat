const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

function formatMessage(user, message) {
  return {
    id: uuidv4(),
    user,
    message,
    time: moment().format("h:mm a")
  };
}

module.exports = formatMessage;
