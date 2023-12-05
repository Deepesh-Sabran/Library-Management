// importing two things in a sigle go, that's why we make a separate index.js file within modals folder
const { userModal, bookModal } = require("../modals/index");
const IssuedBook = require("../dtos/book-dto").default;

// here we are using diffrent approch for exports
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
  // .findById is also a MongoDB method
  const book = await bookModal.findById(id);

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

  // Data Transfer Object (DTO) => transfering information of obj. to another obj.
  const issuedBooks = userWithIssuedBook.map((each) => new IssuedBook(each));

  if (issuedBooks.length === 0) {
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

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "no data to add",
    });
  }
  // here .create is a internal method of MongoDB
  await bookModal.create(data);
  // in the above line we didn't check if the book is alrady present or not because, in MongoDB Id is generated automatically
  const allBooks = await bookModal.find();

  return res.status(200).json({
    success: true,
    message: "book added successfuly",
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const { data } = req.body;

  // we don't need to crosscheck with the id like if user is present or not because, if there is any other id ratherthan one
  // present in the DB then the connection automatically get crashed
  // again .findOneAndUpdate() is a method of MongoDB
  const updatedBook = await bookModal.findOneAndUpdate(
    {
      _id: id, // auto generated id : id what we pass
    },
    data,
    {
      new: true, //using this just in case our database not get refreshed or we've any glitch
    }
  );
  return res.status(200).json({
    success: true,
    messsage: "book update successfuly",
    data: updatedBook,
  });
};
// module.exports = { getAllBooks, getSingleBookById };
