const { getDataFromSheet } = require("./getDataFromSheet");
const { getCycle } = require("./getCycle");
const { saveData } = require("./saveData");
const { saveData_Full } = require("./saveData_Full");
const { getSavedScore } = require("./getSavedScore");
const { saveFix } = require("./saveFix");
const { chooseGameToFix } = require("./chooseGameToFix");

const footballFunc = {
  getDataFromSheet,
  getCycle,
  saveData,
  saveData_Full,
  getSavedScore,
  saveFix,
  chooseGameToFix,
};

module.exports = { footballFunc };
// module.exports = { connectToDB };
