const Admin = require("../models/admin.model");

const { hashPassword } = require("../utils/user");

exports.createUser = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  const newUser = {
    ...req.body,
    password: hashPassword(req.body.password),
  };

  Admin.createUser(newUser, (err, data) => {
    if (err) {
      if (err === "username already taken!") res.status(400).send({ msg: err });
      else res.status(400).send({ msg: "Something went wrong." });
    } else {
      const { ...rest } = data[0];
      const userInfo = { ...rest, username: newUser.username };

      res.status(200).send({ msg: "User created!", userInfo });
    }
  });
};

exports.addCategory = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  Admin.createCategory(req.body, (err, data) => {
    if (err) {
      if (err === "category is exists") res.status(400).send({ msg: err });
      else res.status(400).send({ msg: "Something went wrong." });
    } else {
      const newCategory = data[0];
      res.status(200).send({ msg: "successful", newCategory });
    }
  });
};

exports.deleteCategory = (req, res) => {
  console.log(req.user);
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  Admin.deleteCategory(req.body.categoryId, (err, data) => {
    if (err) {
      if (err === "category does not exists")
        res.status(400).send({ msg: err });
      else res.status(400).send({ msg: "Something went wrong." });
    } else {
      res.status(200).send({ msg: "successful", data });
    }
  });
};

exports.createAuthor = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ msg: "request empty!" });
    return;
  }

  Admin.createAuthor(req.body, (err, data) => {
    if (err) {
      res.status(400).send({ msg: "Something went wrong.", err });
    } else {
      res.status(200).send({ msg: "Author created!", data });
    }
  })
};
