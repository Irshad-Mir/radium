const express = require("express");

const router = express.Router();

const Middleware = require("../middlewares/middleware");
const AuthorModel = require("../models/authorModel");
const AuthorController = require("../controllers/authorController");
const BlogModel = require("../models/blogModel");
const BlogController = require("../controllers/blogController");




router.post("/createAuthor", Middleware.validation, AuthorController.createAuthor);
router.post("/createBlogs", BlogController.createBlogs);
router.get("/getBlog", BlogController.getBlog);
router.put("/updateBlog/:blogId", BlogController.BlogsUpdate);
router.delete("/deleteBlogsp/:blogId", BlogController.deleteBlogsWithId);
router.delete("/deleteBlogsq", BlogController.deleteBlogsWithQuery);
router.post("/userLogin", AuthorController.login);
module.exports = router;
