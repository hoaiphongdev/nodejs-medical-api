'use strict'

const express = require('express')
const router = express.Router()

router.use('/api/auth', require('./auth'))
router.use('/api/blog', require('./blog'))
router.use('/api/category', require('./category'))
router.use('/api/cloud', require('./cloud'))
router.use('/api/invoice', require('./invoice'))
router.use('/api/product', require('./product'))
router.use('/api/user', require('./user'))

module.exports = router