const Book = require('./book.model')
const postBook = async(req,res)=>{
    try{
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(201).send({
            message: "Book posted successfully",
            book: newBook,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: `Failed,${error}`,
            code: 500
        })
    }
}

const getAllBook = async(req,res)=>{
    try{
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send({
            message: "Book get successfully",
            book: books,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: "Failed",
            code: 500
        })
    }
}

const getSingleBook = async(req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).send({
                message: "Failed",
                code: 404
            })
        }
        res.status(200).send({
            message: "Book get successfully",
            book: book,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: "Failed",
            code: 500
        })
    }
}

const updateBook = async(req,res)=>{
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id,req.body,{ new: true });
        if(!book){
            res.status(404).send({
                message: "Failed",
                code: 404
            })
        }
        res.status(200).send({
            message: "Book update successfully",
            book: book,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: `Failed ${error}`,
            code: 500
        })
    }
}

const deleteBook = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteBook = await Book.findByIdAndDelete(id);
        if(!deleteBook){
            res.status(404).send({
                message: "Failed",
                code: 404
            })
        }
        res.status(200).send({
            message: "Book delete successfully",
            book: deleteBook,
            code: 200
        })
    }catch(error){
        res.status(500).send({
            message: "Failed",
            code: 500
        })
    }
}

module.exports = {
    postBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook
}