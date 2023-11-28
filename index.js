const express = require("express");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");

const app = express();
app.use(express.json());

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
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "server is up and running .." });
// });

/**
 * route: /user
 * method: GET
 * description: get all users
 * access: public
 * parameter: none
 */

app.get("/books", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// for non existing routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist .." });
});

app.listen(port, () => {
  console.log(`server created and running on port: ${port}`);
});
