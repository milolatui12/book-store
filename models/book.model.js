const sql = require("../connection");

const Book = function (book) {
  this.title = book.title;
  this.description = book.description;
  this.info = book.info;
};

//get all book have in db then return to controler
Book.getBooks = (result) => {
  sql.query("select id, book_title as title from books", (err, res) => {
    if(err) {
      return result(err, null)
    }

    return result(null, res)
  })
}

//get book infomation with bookId
Book.getBookInfo = (bookId, result) => {
  sql.query("call sp_get_book_info(?)", bookId, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, res[0]);
  });
};


Book.getBookReview = (bookId, result) => {
  sql.query("call sp_get_book_review(?)", bookId, (err, res) => {
    if (err) {
      return result(err, null);
    }

    result(null, res[0]);
  });
};

module.exports = Book;
