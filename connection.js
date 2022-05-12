const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "milo",
  password: "123",
  database: "new_db",
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("failed", err);
  }
});

module.exports = mysqlConnection;