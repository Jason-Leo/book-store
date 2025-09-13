const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')
const uploadRoutes = require('./src/common/upload.route')
const aiRoutes = require('./src/ai/ai.route')
const path = require('path')

// 静态文件服务 - 提供上传文件的访问
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/upload",uploadRoutes)

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