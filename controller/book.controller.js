const Book = require("../models/book.model");

exports.getBooks = (_req, res) => {
  Book.getBooks((err, books) => {
    if (err) {
      res.status(400).send({ msg: "Something went wrong.", err });
    } else {
      res.status(200).send({ msg: "successful", books });
    }
  })
}

exports.getBookInfo = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  Book.getBookInfo(req.body.bookId, (err, data) => {
    if (err) {
      res.status(400).send({ msg: "Something went wrong." });
    } else {
      res.status(200).send({ msg: "successful", data });
    }
  });
};

exports.getBookReview = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  Book.getBookReview(req.body.bookId, (err, data) => {
    if (err) {
      res.status(400).send({ msg: "Something went wrong." });
    } else {
      res.status(200).send({ msg: "successful", data });
    }
  });
};
