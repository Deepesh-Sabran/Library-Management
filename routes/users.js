const express = require("express");
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
  getSubscriptionDetails,
} = require("../controllers/user-controller");
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

// ___________________________________________________________________

// Database Approch for using APIs:
router.get("/", getAllUsers);

// ___________________________________________________________________

/**
 * route: /:id
 * method: GET
 * description: get a user on behalf of particular id
 * access: public
 * parameter: id
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.get("/:id", getUserById);

// ___________________________________________________________________

/**
 * route: /
 * method: POST
 * description: creating a new user
 * access: public
 * parameter: none
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.post("/", createNewUser);

// ___________________________________________________________________

/**
 * route: /
 * method: PUT
 * description: updating a user
 * access: public
 * parameter: id
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.put("/:id", updateUser);

// ___________________________________________________________________

/**
 * route: /:id
 * method: DELETE
 * description: Deleting a user using id
 * access: public
 * parameter: id
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.delete("/:id", deleteUser);

// ___________________________________________________________________

module.exports = router;
