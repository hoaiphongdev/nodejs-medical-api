require('dotenv').config()

module.exports = {
  DB: process.env.APP_DB,
  SECRET: process.env.APP_SECRET,
  PORT: process.env.APP_PORT,
  API_EMAIL: process.env.API_KEY_EMAIL_VERIFY,
  TOKEN_EXPIRES: process.env.TOKEN_EXPIRES,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}
