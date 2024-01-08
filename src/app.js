'use strict'

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

const connectDB = require('./utils/db')
const { v2: cloudinary } = require('cloudinary')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/.env' })
}

const appExpress = express()
const {
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = require('./config')


connectDB()

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})


appExpress.use(cors())
appExpress.use(helmet())

appExpress.use(compression())
appExpress.use(morgan('dev'))

appExpress.use(express.json())
appExpress.use(express.urlencoded({ extended: true }))

appExpress.get('/', (req, res) => {
  res.json({ message: 'Hello world 💘' })
})

// init routes
appExpress.use('/', require('./routes'))


// handle error
appExpress.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

appExpress.use((error, req, res, _) => {
  const statusCode = error.status ?? 500
  return res.status(statusCode).json({
    isSuccess: false,
    code: statusCode,
    data: null,
    message: error.message || 'Internal Server Error'
  })
})


module.exports = appExpress