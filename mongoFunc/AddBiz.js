const { models, connectDb } = require("../models");
const mongoose = require("mongoose");
const { exception } = require("console");

const AddBiz = async function ({
  BizID,
  FirstName,
  LastName,
  BizName,
  CellPhone,
  Home,
  Street,
  City,
  About,
  Service1,
  Service1_Img,
  Service2,
  Service2_Img,
  Service3,
  Service3_Img,
  Email,
  Background,
  Logo,
}) {
  const biz = new models.BizDetails({
    BizID,
    FirstName,
    LastName,
    BizName,
    CellPhone,
    Home,
    Street,
    City,
    About,
    Service1,
    Service1_Img,
    Service2,
    Service2_Img,
    Service3,
    Service3_Img,
    Email,
    Background,
    Logo,
  });

  let newBiz;
  try {
    newBiz = await biz.save();

    return newBiz;
  } catch (error) {
    console.log(`AddBiz - error - ${error}`);
    throw error;
  }
};

module.exports = { AddBiz };
