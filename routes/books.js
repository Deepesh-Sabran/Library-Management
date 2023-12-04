const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");
const router = express.Router();

/**
 * route: /
 * method: GET
 * description: get all books
 * access: public
 * parameter: none
 */

// here we use the router that's why in the path we remove books, we only keep "/" ex: [ /books => /]
// similarly we have [ /books/:id => /:id ]

// ___________________________________________________________________

// Database Approch for using APIs:
router.get("/", getAllBooks);

// ___________________________________________________________________

/**
 * route: /
 * method: POST
 * description: create a new book
 * access: public
 * parameter:
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.post("/", addNewBook);

// ____________________________________________________________

/**
 * route: /:id
 * method: GET
 * description: get book by their id
 * access: public
 * parameter: id
 */

// ___________________________________________________________________

// Database Approch for using APIs:
router.get("/:id", getSingleBookById);

// ___________________________________________________________________

/**
 * route: /issued
 * method: GET
 * description: get all issued books
 * access: public
 * parameter:
 */

// ___________________________________________________________________

// Database Approch for using APIs:

router.get("/issued/by-users", getAllIssuedBooks);

// ___________________________________________________________________

/**
 * route: /:id
 * method: PUT
 * description: create a new book
 * access: public
 * parameter: id
 */

// ___________________________________________________________________

// Database Approch for using APIs:

router.put("/:id", updateBookById);

// ___________________________________________________________________

module.exports = router;
