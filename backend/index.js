const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
const bookRoutes = require('./src/books/book.route')
app.use("/api/books",bookRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    })