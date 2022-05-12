const express = require('express')
const router = express.Router()
const book = require('../controller/book.controller')

router.get('/books', book.getBooks)
router.post('/book-info', book.getBookInfo)
router.get('/book-review', book.getBookReview)

module.exports = router