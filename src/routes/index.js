'use strict'

const express = require('express')
const router = express.Router()

router.use('/api/auth', require('./auth'))
router.use('/api/category', require('./category'))
router.use('/api/product', require('./product'))

module.exports = router