const express = require("express");
const router = express.Router();

const people = require("../controller/people.controller");

router.get("/findall", people.findAll);

module.exports = router;
