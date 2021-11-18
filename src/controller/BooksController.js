const AuthorsModel=require('../models/AuthorsModel.js')
const BooksModel = require('../models/BooksModel.js')
const publisherModel = require('../models/publisherModel.js')
// 1st problem create books
const createAuthors = async function (req, res) {
    var data = req.body
    let savedData = await AuthorsModel.create(data)
    res.send({ data: savedData })

}


// 2nd problem
const createBook = async function (req, res) {
  let bookData = req.body
  let authorId = req.body.author
  let publisherId= req.body.publisher
  let authorFromRequest = await AuthorsModel.findById(authorId)
  let publisherFromRequest= await publisherModel.findById(publisherId)
  if (authorFromRequest && publisherFromRequest ) {
    let savedBook = await BooksModel.create(bookData)
    res.send({ msg: savedBook })
  } else {
    res.send('No such Id in publisher and author')
  }


}
// 3rd problem:->  Write a get books api that fetches all the books along with their author details (you have to populate author)
const getBook = async function (req, res) {
  let allBooks = await BooksModel.find().populate('author')
  res.send({ msg: allBooks });
};
 //4th problem
const publisher= async function(req,res){
    let publisherData= req.body
    let publisher=await  publisherModel.create(publisherData)
    res.send({msg:publisher})
}

//5th problem
const getBooks = async function (req, res) {
  let allBooks = await BooksModel.find().populate('author',{"author_name":1 , "age":1}).populate('publisher')
  res.send({ msg: allBooks });
};
 

module.exports.createAuthors = createAuthors

module.exports.createBook = createBook
module.exports.getBook = getBook
module.exports.publisher = publisher
module.exports.getBooks = getBooks





