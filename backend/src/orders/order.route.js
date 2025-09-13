const express = require('express')
const { createAOrder,getOrderByEmail  } = require('./order.controller')
const router = express.Router()

router.post("/create-order",createAOrder)
router.get("/email/:email",getOrderByEmail)

module.exports = router