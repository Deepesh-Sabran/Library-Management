// data transfer object for book
// transfering some internal attribute from one obj to another obj

class IssuedBook {
  _id; // we know that id is something which is auto generated by the MongoDB, that's why we are writing Id with ( _ )
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnData;

  // whenever we create object, the constructor get invoked = Parameterised constructor

  constructor(user) {
    this._id = user.IssuedBook._id;
    this.name = user.IssuedBook.name;
    this.genre = user.IssuedBook.genre;
    this.price = user.IssuedBook.price;
    this.publisher = user.IssuedBook.publisher;
    // these are not from bookModal, this are in userModalso we directly assigning it from users
    this.issuedBy = user.issuedBy;
    this._issuedDate = user._issuedDate;
    this.returnDate = user.returnDate;
  }
}

// module.exports = IssuedBook;
exports.IssuedBook;
