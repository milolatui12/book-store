const express = require('express')
const router = express.Router()
const admin = require('../controller/admin.controller')

const { requireAdmin } = require('../middleware/user')

router.use(requireAdmin)
router.post('/admin-create-user', admin.createUser)
router.post('/ins-category', admin.addCategory)
router.post('/delete-category', admin.deleteCategory)
router.post('/create-author', admin.createAuthor)

module.exports = router