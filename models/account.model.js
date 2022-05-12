module.exports = (sequelize, Sequelize) => {
  return sequelize.define("accounts", {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.INT,
    },
    userId: {
      type: Sequelize.INT,
    },
  });
};
