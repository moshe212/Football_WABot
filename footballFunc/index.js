const { getDataFromSheet } = require("./getDataFromSheet");
const { getCycle } = require("./getCycle");
const { saveData } = require("./saveData");
const { saveData_Full } = require("./saveData_Full");
const { getSavedScore } = require("./getSavedScore");
const { saveFix } = require("./saveFix");
const { chooseGameToFix } = require("./chooseGameToFix");
const { getSavedGuss_Gavia } = require("./getSavedGuss_Gavia");
const { chooseGameToFix_Gavia } = require("./chooseGameToFix_Gavia");
const { saveFix_Gavia } = require("./saveFix_Gavia");
const { fixMinut_Team_Auto } = require("./fixMinut_Team_Auto");
const { fixAuto_Main } = require("./fixAuto_Main");
const { saveDate_googleAPI } = require("./saveDate_googleAPI");
const { getGameGuss } = require("./getGameGuss");
const { getAchievementsOfSeason } = require("./getAchievementsOfSeason");

const footballFunc = {
  getDataFromSheet,
  getCycle,
  saveData,
  saveData_Full,
  getSavedScore,
  saveFix,
  chooseGameToFix,
  getSavedGuss_Gavia,
  chooseGameToFix_Gavia,
  saveFix_Gavia,
  fixMinut_Team_Auto,
  fixAuto_Main,
  saveDate_googleAPI,
  getGameGuss,
  getAchievementsOfSeason,
};

module.exports = { footballFunc };
// module.exports = { connectToDB };
