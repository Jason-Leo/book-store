const express = require('express')
const { postBook,getAllBook,getSingleBook,updateBook,deleteBook  } = require('./book.controller')
const verifyAdminToken = require('../middleware/verifyAdmin')
const router = express.Router()

router.post("/create-book",verifyAdminToken,postBook)
router.get("/",getAllBook)
router.get("/:id",getSingleBook)
router.put("/edit/:id",verifyAdminToken,updateBook)
router.delete("/:id",verifyAdminToken,deleteBook)

module.exports = router