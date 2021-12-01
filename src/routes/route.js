const express = require("express");

const router = express.Router();

const Middleware = require("../middlewares/middleware");
const AuthorModel = require("../models/authorModel");
const AuthorController = require("../controllers/authorController");
const BlogModel = require("../models/blogModel");
const BlogController = require("../controllers/blogController");

//.........phase 1 API'S.............//


router.post("/createAuthor", Middleware.emailValidation, AuthorController.createAuthor);
router.post("/createBlogs", Middleware.checkAuthentication, BlogController.createBlogs);
router.get("/getBlog", Middleware.checkAuthentication, BlogController.getBlog);
router.put("/updateBlog/:blogId", Middleware.checkAuthentication, BlogController.midUpdateBlog);

router.delete("/deleteBlogsp/:blogId",Middleware.checkAuthentication,BlogController.midDeleteBlogsWithId);

router.post("/userLogin", AuthorController.login);



module.exports = router;
