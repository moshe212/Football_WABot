const mongoose = require("mongoose");

// const BizDetails = require("./BizDetails.js").default;
const BizDetails = require("./BizDetails.js");

let Mongo_Path = process.env.Mongo_Path;

const models = { BizDetails };

module.exports = { models };
// module.exports = { connectToDB };
