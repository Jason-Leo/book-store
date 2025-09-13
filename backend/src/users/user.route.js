const express = require('express')
const router = express.Router()
const { handleLogin } = require('./user.controller')

router.post("/admin",handleLogin)
module.exports = router