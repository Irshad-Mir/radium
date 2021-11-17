//Author mir irshad
const express = require('express');

const router = express.Router();

const AuthorsModel = require('../models/AuthorsModel')


const BooksModel = require('../models/BooksModel')
const BooksController = require('../controller/BooksController')

router.post('/create-books', BooksController.createBooks);
router.post('/create-authors', BooksController.createAuthors);
router.get('/find-book', BooksController.findBook)
router.get('/changePrice', BooksController.changePrice)

module.exports = router;