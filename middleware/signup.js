const db = require("../models/index");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        msg: "username already exist",
      });
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return res.status(400).send({
          msg: "email already exist",
        });
      }

      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for(let role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res.status(400).send({
          msg: "role does not exist",
        });
      }
    }
  }

  next();
};


module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
