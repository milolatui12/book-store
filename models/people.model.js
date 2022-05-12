const sql = require("../connection");

const People = (people) => {
  this.person_id = people.person_id;
  this.first_name = people.first_name;
  this.last_name = people.last_name;
};

People.getAll = (result) => {
  sql.query("select * from people", (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }

    console.log(res);
    result(null, res);
  });
};



module.exports = People;
