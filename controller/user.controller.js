const User = require("../models/user.model");
const { createToken } = require("../utils/jwt");
const jwtDecode = require("jwt-decode");

const { hashPassword, verifyPassword } = require("../utils/user");

exports.signup = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  const newUser = {
    ...req.body,
    password: hashPassword(req.body.password),
  };

  User.createNew(newUser, (err, data) => {
    if (err) {
      if (err === "username already taken!") res.status(400).send({ msg: err });
      else res.status(400).send({ msg: "Something went wrong." });
    } else {
      const { ...rest } = data[0];
      const userInfo = { ...rest };
      const token = createToken(userInfo);
      const decodeToken = jwtDecode(token);
      const expiresAt = decodeToken.exp;

      res.cookie("token", token, { httpOnly: true });
      res
        .status(200)
        .send({ msg: "User created!", token, userInfo, expiresAt });
    }
  });
};

exports.signin = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  User.getOne(req.body, (err, data) => {
    if (err) {
      res.status(400).send({ msg: "something went wrong!" });
    } else if (
      !data.length ||
      !verifyPassword(req.body.password, data[0].pass)
    ) {
      res.status(403).send({ msg: "Wrong email or password." });
    } else {
      const { pass, ...rest } = data[0];
      const userInfo = { ...rest };
      const token = createToken(userInfo);
      const decodeToken = jwtDecode(token);
      const expiresAt = decodeToken.exp;

      res.cookie("token", token, { httpOnly: true });
      res.status(200).send({ msg: "successful", token, userInfo, expiresAt });
    }
  });
};

exports.signout = (_req, res) => {
  res.clearCookie("token")
  res.status(200).send({ msg: "successful"})
}

exports.reviewBook = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  const reviews = {
    ...req.body
  }

  User.reviewBook(req.user.sub, req.body.bookId, reviews, (err, data) => {
    if (err) {
      err.code == 'ER_DUP_ENTRY'? res.status(400).send({ msg: "user has review this book."}):
      res.status(400).send({ msg: "Something went wrong."});
    } else {
      const newReview = data;
      res.status(200).send({ msg: "successful", newReview });
    }
  })
}

