const blogModel = require("../models/blogModel.js")
const authorModel = require("../models/authorModel.js");

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
    const authorDetail = await authorModel.findById(authorId);
    if (authorDetail) {
      let savedData = await blogModel.create(data);
      res.status(201).send({ status: true, data: savedData });
    } else {
      res.status(400).send({ status: false, mg: "Invalid Request" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};

const getBlog = async function (req, res) {
  try {
    const irs= await blogModel.find(
      { isdeleted: false ,
       isPublished: true }
    );
      if (irs) {
          let authorId = req.query.authorId;
          console.log(authorId);
          let cat = req.query.category;
          console.log(cat);
          let tag = req.query.tags;
          let sub = req.query.subcategory;
          let arr = [];
          for (let i = 0; i < irs.length; i++) {
              if (irs[i].authorId == authorId || irs[i].category.filter(x=> x==cat)== cat || irs[i].tags.filter(x=> x==tag) == tag || irs[i].subcategory.filter(x=> x==sub)==sub)
                  arr.push(irs[i]);
      
          }
          res.status(200).send({ data: arr });
          //   res.status(200).send({ status: true, data: { irs } });
      }
      else {
          res.status(404).send({ status: false, mg: "#error-response-structure" });

      }
  } catch (err) {
    res.status(404).send({ status: false, msg: "No blogs found" });
  }
};
module.exports.createBlogs = createBlogs;
module.exports.getBlog=getBlog