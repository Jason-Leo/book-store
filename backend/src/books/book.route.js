const express = require('express')
const { postBook,getAllBook,getSingleBook,updateBook,deleteBook  } = require('./book.controller')
const router = express.Router()

router.post("/create-book",postBook)
router.get("/",getAllBook)
router.get("/:id",getSingleBook)
router.put("/edit/:id",updateBook)
router.delete("/:id",deleteBook)

module.exports = router