const verifySignUp = require("../middleware/signup");
const controller = require("../controller/auth.controller");

const express = require("express");
const router = express.Router();

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

router.post("/signin", controller.signin);
router.get("/check", controller.checktoken);

module.exports = router;
