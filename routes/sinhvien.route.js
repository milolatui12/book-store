const express = require("express");
const router = express.Router();

const sinhvien = require("../controller/sinhvien.controller");

router.get('/', (req, res) => {
    res.status(200).send({msg: 'ok'})
})
router.post("/ins", sinhvien.create);
router.post("/login", sinhvien.login)

module.exports = router;
