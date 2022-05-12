const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models/index");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles, //["user", "admin"]
            },
          },
          //where name = "user" or name = "admin"
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.status(200).send({ msg: "successful role" });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.status(200).send({ msg: "successful" });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ msg: "error", error });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(403).send({ msg: "username or password invalid" });
      }

      const isValidPwd = bcrypt.compareSync(req.body.password, user.password);

      if (!isValidPwd) {
        return res.status(403).send({ msg: "username or password invalid" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        config.secret,
        {
          expiresIn: "30s",
        }
      );

      res.cookie("secureCookie", token, {
        expires: new Date(Date.now() + 16 * 3600000),
        path: '/',
        httpOnly: true,
      })

      return res.status(200).send({
        id: user.id,
        username: user.username,
        token,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ msg: "something went wrong." });
    });
};

exports.checktoken = (req, res) => {
  const token = req.cookies.secureCookie;
  if (!token) {
    return res.status(401).send({ check: false });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err && err.message === "jwt expired") {
      return res.status(401).send({ check: false });
    }

    return res.status(200).send({ check: true });
  });
};
