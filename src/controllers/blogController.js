const BlogModel = require("../models/blogModel.js");
const AuthorModel = require("../models/authorModel.js");

//.............2nd create blogs................

const createBlogs = async function (req, res) {
  try {
    let data = req.body;
    if (data.isPublished == true) {
      data["publishedAt"] = new Date();
      console.log(data);
    }
    console.log(typeof data.isPublished);
    let authorId = req.body.authorId;
    console.log(authorId);
    const authorDetail = await AuthorModel.findById(authorId);
    if (authorDetail) {
      let savedData = await BlogModel.create(data);
      res.status(201).send({ status: true, data: savedData });
    } else {
      res.status(400).send({ status: false, mg: "Invalid Request" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};

//...................3rd get blog by different query params..........

const getBlog = async function (req, res) {
  try {
    //----------------------------------
    let category = req.query.category;
    let tags = req.query.tags;
    let subcategory = req.query.subcategory;

    let getQuery = {
      isDeleted: false,
      isPublished: true,
    };
    if (req.query.authorId) {
      getQuery["authorId"] = req.query.authorId;
    }
    if (req.query.category) {
      getQuery["category"] = req.query.category;
    }
    if (req.query.tags) {
      getQuery["tags"] = req.query.tags;
    }
    if (req.query.subcategory) {
      getQuery["subcategory"] = req.query.subcategory;
    }

    if (req.query.authorId) {
      let blog = await BlogModel.find(getQuery); //filtering out on the bases of author id
      if (blog.length > 0) {
        return res.status(200).send({ status: true, data: blog });
      } else {
        return res.status(404).send({ status: false, msg: "Blog not found" });
      }
    } else {
      let blog = await BlogModel.find({
        isDeleted: false,
        isPublished: true,
        $or: [
          { category: category },
          { tags: tags },
          { subcategory: subcategory },
        ],
      });

      if (blog.length > 0) {
        return res.status(200).send({ status: true, data: blog });
      } else {
        return res.status(404).send({ status: false, msg: "Blog not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

//.......... 4th api update ........
const midUpdateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let newTags = req.body.tags;
    let newSubCategory = req.body.subcategory;

    let data = await BlogModel.findOne({ _id: blogId });

    if (req.validToken.authorId == data.authorId) {
      //Authorisation
      let updatedSubCategory = data["subcategory"].concat(newSubCategory);
      let updatedTag = data["tags"].concat(newTags);

      if (data.isDeleted == false && data) {
        let updatedata = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          {
            title: newTitle,
            body: newBody,
            tags: updatedTag,
            subcategory: updatedSubCategory,
            publishedAt: new Date(),
            isPublished: true,
          },
          { new: true }
        );
        res.status(200).send({ msg: "successfully updated", data: updatedata });
      } else {
        res.status(404).send({ msg: "data not found" });
      }
    } else {
      res
        .status(403)
        .send({ status: false, msg: "Prohibited-authentication failed" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};

//---------------------------------5th-DELETE BLOG WITH ID------------------------------------------------------------------------
const midDeleteBlogsWithId = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blogDetail = await BlogModel.findById(blogId);

    if (req.validToken.authorId == blogDetail.authorId) {
      //Authorisation of author

      if (blogDetail && blogDetail.isDeleted == false) {
        let deletedBlog = await BlogModel.findOneAndUpdate(
          { _id: blogId },
          { isDeleted: true, deletedAt: new Date() },
          { new: true }
        );

        res.status(200).send({ status: true });
      } else {
        res
          .status(404)
          .send({ status: false, msg: "Blog with this blog id doesn't exist" });
      }
    } else {
      res
        .status(403)
        .send({ status: false, msg: "Prohibited-authentication failed" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};

//.........................6th api Deletedblogs with query........................//

const midDeleteBlogsWithQuery = async function (req, res) {
  try {
    
    let category = req.query.category;
    let tags = req.query.tags;
    let subcategory = req.query.subcategory;
    let published = req.query.isPublished;

    let getQuery = {
      isDeleted: false,
    };
    if (req.query.authorId) {
      getQuery["authorId"] = req.query.authorId;
    }
    if (req.query.category) {
      getQuery["category"] = req.query.category;
    }
    if (req.query.tags) {
      getQuery["tags"] = req.query.tags;
    }
    if (req.query.subcategory) {
      getQuery["subcategory"] = req.query.subcategory;
    }

    if (req.query.authorId) {
      if (req.validToken.authorId == req.query.authorId) {
        let deletedBlog = await blogModel.findOneAndUpdate(getQuery, {
          isDeleted: true,
          deletedAt: new Date(),
          new: true,
        });
        if (deletedBlog) {
          return res.status(200).send({ status: true, data: deletedBlog });
        } else {
          return res.status(404).send({ status: false, msg: "blog not found" });
        }
      } else {
        res
          .status(403)
          .send({ status: false, msg: "Prohibited-authentication failed" });
      }
    } else {
      let blog = await blogModel.find({
        isDeleted: false,
        $or: [
          { category: category },
          { tags: tags },
          { subcategory: subcategory },
          { isPublished: published },
        ],
      });
      for (let i = 0; i < blog.length; i++) {
        if (req.validToken.authorId == blog[i].authorId) {
          await blogModel.findOneAndUpdate(
            { _id: blog[i]._id },
            { isDeleted: true, deletedAt: new Date() }
          );
        }
      }
      return res.status(200).send({ status: true });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};

module.exports = {
  createBlogs,
  getBlog,
  midUpdateBlog,
  midDeleteBlogsWithId,
  midDeleteBlogsWithQuery,
};
