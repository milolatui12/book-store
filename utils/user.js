const crypto = require("crypto");

const hashPassword = (password) => {
  const hash = crypto.createHash("md5");
  const hashedPassword = hash.update(password).digest("hex");

  return hashedPassword;
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  const hash = crypto.createHash("md5");
  const hash_pass = hash.update(passwordAttempt).digest("hex");
  return hash_pass === hashedPassword;
};

module.exports = {
  hashPassword,
  verifyPassword,
};
