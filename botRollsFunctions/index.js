const { FirstSort } = require("./FirstSort");
const { GviaHamedina } = require("./GviaHamedina");
const { LigatAl } = require("./LigatAl");
const { Mondial } = require("./Mondial");
const { LigatAlufot } = require("./LigatAlufot");
const { shlavHanokOut } = require("./shlavHanokOut");
const { shlavHanokOut_Mondial } = require("./shlavHanokOut_Mondial");
const { Olami } = require("./Olami");
const { Nba } = require("./Nba");
const { Euro } = require("./Euro");
const { shlavHanokOut_Euro } = require("./shlavHanokOut_Euro");

const botRollsFunctions = {
  FirstSort,
  GviaHamedina,
  LigatAl,
  Mondial,
  LigatAlufot,
  shlavHanokOut,
  shlavHanokOut_Mondial,
  Olami,
  Nba,
  Euro,
  shlavHanokOut_Euro,
};

module.exports = { botRollsFunctions };
// module.exports = { connectToDB };
