const mongoose = require('mongoose')

const { DB } = require('../config')

const connectDB = () => {
  try {
    mongoose.connect(DB);
    console.log(`🟢 MongoDB Connected 🍀🍀🍀 `)
  } catch (err) {
    console.log(`❌ Unable to connect with mongoDB 🚫🚫🚫 \n${err}`)
    process.exit(1)
  }
}


module.exports = connectDB
