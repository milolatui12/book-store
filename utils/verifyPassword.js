const crypto = require("crypto");

const verifyPassword = (passwordAttempt, hashedPassword) => {
  const hash = crypto.createHash("md5");
  const hash_pass = hash.update(passwordAttempt).digest("hex");

  return hash_pass === hashedPassword;
};

module.exports = verifyPassword