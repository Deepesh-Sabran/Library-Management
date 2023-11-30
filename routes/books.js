const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();

/**
 * route: /
 * method: GET
 * description: get all books
 * access: public
 * parameter: none
 */

// here we use the router that's why in the path we remove books, we only keep "/" ex: [ /users => /]
// similarly we have [ /books/:id => /:id ]

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * route: /
 * method: POST
 * description: create a new book
 * access: public
 * parameter:
 */

router.post("/", (req, res) => {
  // create a book
  const { id, name, author, gener, price, publisher } = req.body;

  // if (!id || !name || !author || !gener || !price || !publisher) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "nothing to create",
  //   });
  // }
  // check if the book already exist or not
  const book = books.find((each) => each.id === id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "book already exist",
    });
  }
  books.push({ id, name, author, gener, price, publisher });
  return res.status(201).json({
    success: true,
    message: "book created",
    data: books,
  });
});

// ____________________________________________________________

// router.post("/", (req, res) => {
//   const { data } = req.body;

// here we are taking data in {} object from so we have to write req. body also in {} obj format ex: {"":{__:""}}

//   if (!data) {
//     return res.status(400).json({
//       success: false,
//       message: "No data provided to add a book",
//     });
//   }

//   const book = books.find((each) => each.id === data.id);

//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book with the given ID already exists",
//     });
//   }

//   const allBooks = [...books, data];
//   return res.status(200).json({ success: true, data: allBooks });
// });

// ____________________________________________________________________________

/**
 * route: /issued
 * method: GET
 * description: get all issued books
 * access: public
 * parameter:
 */

router.get("/issued", (req, res) => {
  // if you write the code in top then URL should be
  // filter / check users who issue book
  const userWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBook = [];

  // matching the book id of each user who issue book, with the book id present in book.json
  userWithIssuedBook.forEach((each) => {
    // here we are finding user issued which book
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issueDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBook.push(book);
  });
  if (issuedBook.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no book have been issued yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user with the issued book",
    data: issuedBook,
  });
});

/**
 * route: /:id
 * method: GET
 * description: get book by their id
 * access: public
 * parameter: id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "book found",
    data: book,
  });
});

/**
 * route: /:id
 * method: PUT
 * description: create a new book
 * access: public
 * parameter: id
 */

router.put("/:id", (req, res) => {
  // get id from req. parameter
  const id = req.params.id;
  // store value for updated field from req.body
  const { data } = req.body;
  // check if the book exist
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }
  const updatedBook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    // whatever not updated that should be same
    return each;
  });
  return res.status(202).json({
    success: true,
    message: "book updated",
    data: updatedBook,
  });
});

/**
 * route: /issued
 * method: GET
 * description: get all issued books
 * access: public
 * parameter:
 */

// router.get("/issued/users", (req, res) => {   // if you write code in bottom then URL should be
//   // filter users who issue book
//   const userWithIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each;
//   });

//   const issuedBook = [];

//   // matching the book id of each user who issue book, with the book id present in book.json
//   userWithIssuedBook.forEach((each) => {
//     // here we are finding user issued which book
//     const book = books.find((book) => book.id === each.issuedBook);

//     book.issuedBy = each.name;
//     book.issueDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBook.push(book);
//   });
//   if (issuedBook.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "no book have been issued yet",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "user with the issued book",
//     data: issuedBook,
//   });
// });

module.exports = router;
