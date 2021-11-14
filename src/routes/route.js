const express = require('express');

const router = express.Router();
const BooksModel = require('../models/BooksModel')
const BooksController= require('../controller/BooksController')

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/createBooks', BooksController.createBooks );
router.get('/getAllBooks', BooksController.getBooksData )
module.exports = router;