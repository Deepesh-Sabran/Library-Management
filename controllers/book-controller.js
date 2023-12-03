// importing two things in a sigle go, that's why we make a separate index.js file within modals folder
const { userModal, bookModal } = require("../modals/index");

// here we are using diffrent approch
// here we use async & await because making connection with database it takes certain time
exports.getAllBooks = async (req, res) => {
  // anytime we need to interact with our DB we need to use async & await
  // here .find() / .findAll() is a MongoDB method
  const books = await bookModal.find(); // here we are not fetching from our json file, we are fetching from our DB

  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no book found",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: books,
    });
  }
};
// const getAllBooks = () => {};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModal.findById(id); // .findById is also a MongoDB method

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: book,
    });
  }
};
// const getSingleBookById = () => {};

exports.getAllIssuedBooks = async (req, res) => {
  const userWithIssuedBook = await userModal
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook"); // populate basically as append/push method

  // Data Transfer Object

  if (issuedBook.length === 0) {
    return res.status(400).json({
      success: false,
      message: "no book have been issued",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "users with issued book",
      data: issuedBooks,
    });
  }
};

// module.exports = { getAllBooks, getSingleBookById };
