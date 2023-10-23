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
const { saveData_googleAPI } = require("./saveData_googleAPI");
const { getGameGuss } = require("./getGameGuss");
const { getAchievementsOfSeason } = require("./getAchievementsOfSeason");
const { getTablesData } = require("./getTablesData");
const { getImage } = require("./getImage");
const { getTableAnswer } = require("./getTableAnswer");
const { getTableTextMassages } = require("./getTableTextMassages");
const { chooseGameToFixAlufot } = require("./chooseGameToFixAlufot");
const { fixAuto_Main_Nokout } = require("./fixAuto_Main_Nokout");
const { getSavedGuss_Nokout } = require("./getSavedGuss_Nokout");
const { chooseGameToFix_Nokout } = require("./chooseGameToFix_Nokout");
const { saveFix_Nokout } = require("./saveFix_Nokout");
const { firstSort } = require("./firstSort");
const { chooseGameToFix_Olami } = require("./chooseGameToFix_Olami");
const { getDifference } = require("./getDifference");
const { getSavedGuss_Nba } = require("./getSavedGuss_Nba");
const { saveFix_Nba } = require("./saveFix_Nba");

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
  saveData_googleAPI,
  getGameGuss,
  getAchievementsOfSeason,
  getTablesData,
  getImage,
  getTableAnswer,
  getTableTextMassages,
  chooseGameToFixAlufot,
  fixAuto_Main_Nokout,
  getSavedGuss_Nokout,
  chooseGameToFix_Nokout,
  saveFix_Nokout,
  firstSort,
  chooseGameToFix_Olami,
  getDifference,
  getSavedGuss_Nba,
  saveFix_Nba,
};

module.exports = { footballFunc };
// module.exports = { connectToDB };
