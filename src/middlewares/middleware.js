const AuthorController = require("../controllers/authorController");

   
const jwt = require("jsonwebtoken");

const validation = async function (req, res, next) {
  let data = req.body.email;
  if (data) {
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (data.match(validEmail)) {
      next();
    } else {
      res.send({ msg: "Invalid email Id" });
    }
  } else {
    res.send({ msg: "No Email Id" });
  }
};

let tokenCheck = function (req, res, next) {
  let token = req.headers["x-api-key"];
  let validToken = jwt.verify(token, "radiumIrs");
  if (validToken) {
    req.body.validToken = validToken;
    next();
  } else {
    res.send({ status: false, msg: "token is invalid" });
  }
};


module.exports = { validation, tokenCheck };
