const sql = require("../connection");

const User = (user) => {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.phoneNumber = user.phoneNumber;
};

//create new user with role = 2 and select this user then return to controler
User.createNew = (newUser, result) => {
  const { firstName, lastName, phoneNumber, username, password, role } =
    newUser;
  sql.query(
    "select id from accounts where username = ?",
    username,
    (err, check) => {
      if (err) {
        result(err, null);
        return;
      }

      if (check.length) {
        result("username already taken!", null);
        return;
      }

      sql.query(
        "call sp_signup(?,?,?,?,?,?)",
        [firstName, lastName, phoneNumber, username, password, 2],
        (e, res) => {
          if (e) {
            result(e, null);
            return;
          }

          result(null, res[0]);
        }
      );
    }
  );
};

//select user fit with userInfo then return to controler
User.getOne = (userInfo, result) => {
  const { username } = userInfo;

  sql.query("call sp_login(?)", username, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, res[0]);
  });
};

User.reviewBook = (userId, bookId, reviews, result) => {
  const { rate, review } = reviews
  sql.query(
    "call sp_review_book(?, ?, ?, ?)",
    [bookId, userId, rate, review],
    (err, res) => {
      if (err) {
        return result(err, null);
      }

      const saveReview = { id: res[0][0].reviewId, rate, review }
      result(null, saveReview)
    }
  );
};

module.exports = User;
