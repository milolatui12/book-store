const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      iss: "ptit.hcm",
      aud: "ptit.hcm",
    },
    "n18dcat094",
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

module.exports = {
    createToken
}