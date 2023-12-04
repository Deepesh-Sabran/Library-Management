const mongoose = require("mongoose");

function dbConnection() {
  // because of security concern we "processs our .env data", we didn't write the URL directly
  const DB_URL = process.env.MONGO_URI;

  //after fetching the URL from .env file we make a connection
  mongoose
    .connect(DB_URL, {
      // whenever we make connection our db to node or something before that we need this file, for every project
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // { this are required till before nodeJS v-4 }
    })
    .then(() => {
      console.log("DB connection successful.");
    })
    .catch((err) => {
      console.error(`DB connection error:${err}`);
    });
}

const db = mongoose.connection; // here we build a connection with our database

// now we nned to ON our db ,,,, if the db on with any error then this will shown
// db.on("error", console.error.bind(console, "Connection errors")); // here we bind the error in console line

// if there is no error then we need to connect only for single time (once)
// db.once("open", () => {
//   console.log("db Connected !!");
// });

module.exports = dbConnection;
