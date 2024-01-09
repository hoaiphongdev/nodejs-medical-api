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
appExpress.use((req, res, next) => {
  const allowedOrigins = [
    'https:localhost:3100',
    'https:localhost:3101',
    'http:localhost:3100',
    'http:localhost:3101',
    'https://turborepo-medical-admin.vercel.app',
    'https://turborepo-medical-admin-hoaiphongdevs-projects.vercel.app',
    'https://turborepo-medical-admin-git-prod-hoaiphongdevs-projects.vercel.app'
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})
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
