const sql = require("../connection");

const Admin = function (admin) {
  this.id = admin.id;
  this.name = admin.name;
};

//create new user and select this user then return to controler
Admin.createUser = (newUser, result) => {
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
        [firstName, lastName, phoneNumber, username, password, role],
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

//create new book category
Admin.createCategory = (newCategory, result) => {
  sql.query(
    "select id from categories where category_name = ?",
    newCategory.name,
    (err, check) => {
      if (err) {
        return result(err, null);
      }

      if (check.length) {
        return result("category is exists", null);
      }

      sql.query("call sp_ins_category(?)", newCategory.name, (e, res) => {
        if (e) {
          return result(e, null);
        }

        result(null, res[0]);
      });
    }
  );
};

//delete category with categoryId
Admin.deleteCategory = (categoryId, result) => {
  sql.query("delete from categories where id = ?", categoryId, (err, res) => {
    if (err) {
      return result(err, null);
    }

    if (!res.affectedRows) {
      return result("category does not exists", null);
    }
    console.log(res.affectedRows);

    return result(null, categoryId);
  });
};

//create new author
Admin.createAuthor = (newAuthor, result) => {
  const { firstName, lastName } = newAuthor;
  sql.query(
    "call sp_ins_author(?, ?)",
    [firstName, lastName],
    (err, res) => {
      if (err) {
        return result(err, null)
      }

      const saveAuthor = {id: res[0][0].authorId, firstName, lastName}

      return result(null, saveAuthor)
    }
  );
};

module.exports = Admin;


