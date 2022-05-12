const jwtDecode = require("jwt-decode");

exports.attachUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "Authentication invalid!" });
  }

  const decodedToken = jwtDecode(token);

  if (!decodedToken) {
    return res
      .status(401)
      .json({ msg: "There was a problem authorizing the request" });
  } else {
    req.user = decodedToken;
    next();
  }
};

exports.requireAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== 1) {
    return res.status(401).json({ msg: "Insufficient role" });
  }

  next()
};
