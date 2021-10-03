const { getDataFromSheet } = require("./getDataFromSheet");
const { getCycle } = require("./getCycle");
const { saveData } = require("./saveData");
const { saveData_Full } = require("./saveData_Full");
const { getSavedScore } = require("./getSavedScore");
const { saveFix } = require("./saveFix");

const footballFunc = {
  getDataFromSheet,
  getCycle,
  saveData,
  saveData_Full,
  getSavedScore,
  saveFix,
};

module.exports = { footballFunc };
// module.exports = { connectToDB };
