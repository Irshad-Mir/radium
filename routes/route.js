const express = require('express');

const router = express.Router();
//1st problem
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
//2nd problem
router.get('/movies', function (req, res) {
    
    let movies = (['dabang', 'wanted', 'golmall'])
    res.send(movies)
});
//3rd problem
router.get('/movies/:movieid', function (req, res) {
    let movies = ['dabang', 'wanted', 'golmall']
    let id = req.params.movieid
  //  let movieAtId = movies[id]
     id>=movies.length?res.send("Enter valid index"):res.send(movies[id])
});

//4th problem
router.get('/film', function (req, res) {
    

let arr=[ {
 id: 1,
 movies: 'The Shining'
},
{
 id: 2,
        movies: 'Incendies'
 },
    {
 id: 3,
 movies: 'Rang de Basanti'
}, {
 id: 4,
 movies: 'Finding Demo'
}]
let i = req.params.film

    for (let i = 0; i <arr.length; i++) {
        res.send(arr)

        }
    
});
//5 problem
router.get('/bollywood/:film', function (req, res) {
    

let array=[ {
 id: 1,
 movies: 'The Shining'
},
{
 id: 2,
        movies: 'Incendies'
 },
    {
 id: 3,
 movies: 'Rang de Basanti'
}, {
 id: 4,
 movies: 'Finding Demo'
}]
let id = req.params.film
  id>=array.length?res.send("Enter valid index"):res.send(array[id])  

    
});

module.exports = router;