const mongoose = require("mongoose");

const BizDetailsSchema = new mongoose.Schema({
  BizID: String,
  FirstName: String,
  LastName: String,
  BizName: String,
  CellPhone: String,
  Home: String,
  Street: String,
  City: String,
  About: String,
  Service1: String,
  Service1_Img: String,
  Service2: String,
  Service2_Img: String,
  Service3: String,
  Service3_Img: String,
  Email: String,
  Background: String,
  Logo: String,
});

module.exports = mongoose.model("bizdetails", BizDetailsSchema);
// mongoose.model("categorys", CategorySchema);
