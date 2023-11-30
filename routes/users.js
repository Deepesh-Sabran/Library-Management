const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();

/**
 * route: /
 * method: GET
 * description: get all users
 * access: public
 * parameter: none
 */

// here we use the router that's why in the path we remove users, we only keep "/" ex: [ /users => /]
// similarly we have [ /users/:id => /:id ]

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * route: /:id
 * method: GET
 * description: get a user on behalf of particular id
 * access: public
 * parameter: id
 */

router.get("/:id", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user exist",
    data: user,
  });
});

/**
 * route: /
 * method: POST
 * description: creating a new user
 * access: public
 * parameter: none
 */

router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).json({
      success: false,
      message: "user already exist",
    });
  }
  users.push({ id, name, surname, email, subscriptionType, subscriptionDate });

  return res.status(201).json({
    success: true,
    message: "Item added suucessfully",
    data: users,
  });
});

/**
 * route: /
 * method: PUT
 * description: updating a user
 * access: public
 * parameter: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  const { data } = req.body;
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }

  const updatedData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data, // written item only updated
        //we can't write each & data vice-versa because each have existing value
        // & we need to change it with new value which is in data
      };
    }
    // whatever not updated that should be same
    return each;
    // whatever not changed it'll be same as before, if we dont write this statment then it shows error/undefined
  });

  return res.status(201).json({
    success: true,
    message: "updated successfully",
    data: updatedData,
  });
});

/**
 * route: /:id
 * method: DELETE
 * description: Deleting a user using id
 * access: public
 * parameter: id
 */

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res
    .status(200)
    .json({ success: true, message: "user deleted", data: users });
});

module.exports = router;
