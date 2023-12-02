const express = require("express"); //importing express module
const dotenv = require("dotenv"); //importing dotenv module

const dbConnection = require("./databaseConnection"); //importing dbConnection file
// const { users } = require("./data/users.json");
// const { books } = require("./data/books.json");

const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

dotenv.config(); // to configure dotenv file

const app = express();
app.use(express.json());

dbConnection(); // calling our dbConnection function before having a port

const port = 8081;

// ____________________________________________
// if we keep generic routes first instead of specific routes
// then we got error, so basically we need to keep
// generic routes at last & specific routes at first
// ____________________________________________
// app.get("*", (req, res) => {
//   res.status(404).json({ message: "This route does not exist .." });
// });
// ____________________________________________

// route for home page
app.get("/", (req, res) => {
  res.status(200).json({ message: "server is up and running .." });
});

// in one page if we handle all the api's then the server get heavy so we make here routes
// for different group of api's ex: for users, for books
app.use("/users", userRouter);
app.use("/books", bookRouter);

// for non existing routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist .." });
});

app.listen(port, () => {
  console.log(`server created and running on port: ${port}`);
});
