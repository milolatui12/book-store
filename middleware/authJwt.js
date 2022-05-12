const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models/index");
const User = db.user;

const verifyToken = (req, res, next) => {
  const token = req.cookies.secureCookie;

  if (!token) {
    return res.status(403).send({
      msg: "no token provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(400).send({ msg: "something went wrong." });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let role of roles) {
        if (role.name === "admin") {
          next();
          return;
        }
      }

      return res.status(403).send({ msg: "require admin" });
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let role of roles) {
        if (role.name === "moderator") {
          next();
          return;
        }
      }

      return res.status(403).send({ msg: "require moderator" });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let role of roles) {
        if (role.name === "moderator" || role.name === "admin") {
          next();
          return;
        }
      }

      return res.status(403).send({ msg: "require moderator or admin" });
    });
  });
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
