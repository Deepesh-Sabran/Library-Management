const express = require("express");
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  updateUser,
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

/**
 * route: /subscription-details/:id
 * method: GET
 * description: Get all user subscription details by id
 * access: public
 * parameter: id
 */

// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(400).json({
//       ssuccess: false,
//       message: "user not exist",
//     });
//   }

//   const getDateInDays = (data = "") => {
//     let date;
//     if (data === "") {
//       date = new Date();
//     } else {
//       date = new Date(data); // calculating date according to data
//     }
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   };

//   const subscriptionType = (date) => {
//     if (users.subscriptionType === "Basic") {
//       date = date + 90;
//     } else if (users.subscriptionType === "Standard") {
//       date = date + 180;
//     } else if (users.subscriptionType === "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = getDateInDays(subscriptionDate);

//   // console.log(returnDate);
//   // console.log(currentDate);
//   // console.log(subscriptionDate);
//   // console.log(subscriptionExpiration);

//   const data = {
//     ...user,
//     isSubscriptionExpired: subscriptionExpiration < currentDate,

//     daysLeftForExpiration:
//       subscriptionExpiration < currentDate
//         ? 0
//         : subscriptionExpiration - currentDate,

//     fine:
//       returnDate < currentDate
//         ? subscriptionExpiration < currentDate
//           ? 100
//           : 50
//         : 0,
//   };

//   return res.status(200).json({
//     success: true,
//     message: "subscription detils for thee user is: ",
//     data,
//   });
// });

module.exports = router;
