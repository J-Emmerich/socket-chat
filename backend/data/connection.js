const mongoose = require("mongoose");
const {portMongo, database} = require("../config/config")


try {
  mongoose.connect(`mongodb://localhost:${portMongo}/${database}`)
    .catch((err) => console.log(err.message));
  
  mongoose.connection.on("connected", () => {
    console.log("You're connected to MongoDB");
  });

} catch (err) {
  console.log(err)
}




module.exports = mongoose;
