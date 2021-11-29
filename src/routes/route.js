const express = require("express");

const router = express.Router();


const authorModel = require("../models/authorModel");
const authorController = require("../controllers/authorController");
const blogModel = require("../models/blogModel");
const blogController = require("../controllers/blogController");




router.post("/createAuthor", authorController.createAuthor);
router.post("/createBlogs", blogController.createBlogs);
router.get("/getBlog", blogController.getBlog);
module.exports = router;
