const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    BookName: String,
    BookAuthor: String,
    category: String,
    year: Number
}, { timestamps: true })




module.exports = mongoose.model( 'Books', BooksSchema)