module.exports = {
  HOST: "localhost",
  USER: "milo",
  PASSWORD: "123",
  DB: "new_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
