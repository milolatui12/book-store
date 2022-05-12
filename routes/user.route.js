const express = require("express");
const router = express.Router();
const { attachUser, requireAdmin } = require('../middleware/user')

const user = require('../controller/user.controller')

router.post('/signup', user.signup)
router.post('/signin', user.signin)
router.get('/signout', user.signout)
router.use(attachUser)
router.post('/review-book', user.reviewBook)

module.exports = router

