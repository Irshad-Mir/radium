const bookModel = require("../models/bookModel");


const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false; //it cheks is there value is null or undefined
  if (typeof value === "string" && value.trim().length === 0) return false; //it checks the value conAtain only space or not
  return true;
};


//-------------------Book creation-----------------------//
const bookCreation = async (req, res) => {
  try {
    const { title, excerpt, ISBN, category, subcategory, coverLink } = req.body; //We are using destructring here to access the value of req body

    //
    //-------validation cheking going on------//
 /*   if (!isValid.isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide body of book Details" });
    }
    */
    if (!isValid(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide title or name title" });
    }
    
    if (!isValid(excerpt)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide excerpt " });
    }
    if (!isValid(ISBN)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide ISBN" });
    }
    if (!isValid(category)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide category" });
    }
    if (!isValid(subcategory)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide subcategory" });
      }
      if (!isValid(coverLink)) {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide coverLink" });
      }
    //--------validation end------///

    //-----restict Duplicate entry of ISBN and TITLE-----////
    let findBooks = await bookModel.findOne({ title: title });
    if (findBooks) {
      return res
        .status(400)
        .send({ status: false, msg: "This title is duplicate" });
    }
    let findBooks1 = await bookModel.findOne({ ISBN: ISBN });
    if (findBooks1) {
      return res
        .status(400)
        .send({ status: false, msg: "This ISBN is duplicate" });
    }
    // -------------------------------END-----------------------------

    let data = req.body;
    let s = await bookModel.find(data);
    if (!s) {
      return res.status(400).send({ msg: "The given Userid is INVALID" });
    } else {
      data.releasedAt = Date();
      let savedData = await bookModel.create(data);
      return res.status(201).send({ status: true, data: savedData });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
module.exports={bookCreation}