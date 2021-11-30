const BlogModel = require("../models/blogModel.js")
const AuthorModel = require("../models/authorModel.js");

//.............2nd create blogs................

const createBlogs = async function (req, res) {
    try {
        let data = req.body
        if (data.isPublished == true) {
           
            data["publishedAt"] = new Date()
             console.log(data);
        }
        console.log(typeof data.isPublished)
      let authorId = req.body.authorId;
      console.log(authorId)
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
    console.log(getQuery);
    if (req.query.authorId) {
      let blog = await BlogModel.find(getQuery);
      return res.status(200).send({ status: true, data: blog });
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

      return res.status(200).send({ status: true, data: blog });
    }
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};
//.................4th update blog by blogId.......................

const BlogsUpdate = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let newTitle = req.body.title;
    let newBody = req.body.body;
    let newTags = req.body.tags;
    let newSubCategory = req.body.subcategory;

    let data = await BlogModel.findOne({ _id: blogId, isDeleted:false });

    if (data.isDeleted == false && data) {
      let updatedSubCategory = data["subcategory"].concat(newSubCategory);
      console.log(updatedSubCategory);
      let updatedTag = data["tags"].concat(newTags);
      console.log(updatedTag);
      let updatedata = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        {
          title: newTitle,
          body: newBody,
          tags: updatedTag,
          subCategory: updatedSubCategory,
          publishedAt: new Date(),
          isPublished: true,
        },
        { new: true }
      );
      res.status(200).send({ msg: "successfully updated", data: updatedata });
    } else {
      res.status(404).send({ msg: "data not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "failed", error: error.message });
  }
}; 

//---------------------------5th-DELETE BLOG WITH ID------------------------------------------------------
const deleteBlogsWithId = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blogDetail = await BlogModel.findById(blogId);
    if (blogDetail && blogDetail.isDeleted == false) {
      
      let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true,deletedAt:new Date() }, { new: true });

      res.status(200).send();
    } else {
      res.status(404).send({ status: false, msg: "Blog with this blog id doesn't exist" });
    }

  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }

};



//----------------------------6th-DELETE BLOG WITH QUERY------------------------------------------------------------
const deleteBlogsWithQuery = async function (req, res) {
  try {
    //----------------------------------
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
    console.log(getQuery);
    if (req.query.authorId) {
      //let blog= await blogModel.find(getQuery)
      let deletedBlog = await BlogModel.findOneAndUpdate(getQuery, {
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
      let blog = await BlogModel.find({
        isDeleted: false,
        $or: [
          { category: category },
          { tags: tags },
          { subcategory: subcategory },
          { isPublished: published },
        ],
      });
      for (let i = 0; i < blog.length; i++) {
        await blogModel.findOneAndUpdate(
          { _id: blog[i]._id },
          { isDeleted: true, deletedAt: new Date() }
        );
      }
      return res.status(200).send({ status: true });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};
module.exports.createBlogs = createBlogs
module.exports.getBlog=getBlog
module.exports.BlogsUpdate = BlogsUpdate
module.exports.deleteBlogsWithId = deleteBlogsWithId
module.exports.deleteBlogsWithQuery = deleteBlogsWithQuery

