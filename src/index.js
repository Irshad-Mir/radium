const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer') // HERE

const route = require('./routes/route.js');

const app = express();
///////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any()) // HERE

app.use('/', route);
const mongoose = require("mongoose");
const { response } = require("express");

mongoose
  .connect(
    "mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/irshad_db?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb running on 27017"))
  .catch((err) => console.log(err));


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});