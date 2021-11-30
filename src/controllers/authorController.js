const AuthorModel = require("../models/authorModel.js");
const BlogModel = require("../models/blogModel.js");
const jwt = require("jsonwebtoken");

//..........ist create author.......
const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await AuthorModel.create(data);
    res.status(200).send({ status: true, msg: savedData });
  } catch {
    res.status(400).send({
      status: false,
      msg: "BAD REQUEST",
    });
  }
};

//...............7th login by some credintials................//

const login = async function (req, res) {
  try {
    let authorEmail = req.body.email;
    let authorPassword = req.body.password;

    let credentials = await AuthorModel.findOne({
      email: authorEmail,
      password: authorPassword,
    });

    if (credentials) {
      let payload = { authorId: credentials._id };
      let token = jwt.sign(payload, "radiumIrs");
      res
        .status(200)
        .send({ status: true, data: credentials._id, token: token });
    } else {
      res.status(400).send({ msg: "Invalid credentials " });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.login = login;
