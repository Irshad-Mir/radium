const authorModel = require("../models/authorModel.js");
const blogModel = require("../models/blogModel.js");

const createAuthor = async function (req, res) {
    try {
        var data = req.body;
        let savedData = await authorModel.create(data);
        res.status(200).send({ status: true, msg: savedData })
    }

  catch {
        res.status(400).send({
            status: false,
            msg: "BAD REQUEST"
        });
    }
}

module.exports.createAuthor = createAuthor;
