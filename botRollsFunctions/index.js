const { FirstSort } = require("./FirstSort");
const { GviaHamedina } = require("./GviaHamedina");
const { LigatAl } = require("./LigatAl");
const { Mondial } = require("./Mondial");
const { LigatAlufot } = require("./LigatAlufot");
const { shlavHanokOut } = require("./shlavHanokOut");

const botRollsFunctions = {
  FirstSort,
  GviaHamedina,
  LigatAl,
  Mondial,
  LigatAlufot,
  shlavHanokOut,
};

module.exports = { botRollsFunctions };
// module.exports = { connectToDB };
