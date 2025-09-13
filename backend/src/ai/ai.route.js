const express = require('express')
const router = express.Router()
const { streamChat } = require('./ai.controller')

router.post('/chat-stream', streamChat)

module.exports = router




