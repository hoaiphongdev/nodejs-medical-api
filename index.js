const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

// const connectDB = require('./utils/db')
const { v2: cloudinary } = require('cloudinary')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/.env' })
}

const app = express()
// const {
//     CLOUDINARY_NAME,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET
// } = require('./config')

const PORT = process.env.PORT || 5000

// connectDB()

// cloudinary.config({
//     cloud_name: CLOUDINARY_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET
// })


app.use(cors())
app.use(helmet())

app.use(compression())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({ message: "Hello world 💘" });
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT} 🔥🔥🔥`)
})
