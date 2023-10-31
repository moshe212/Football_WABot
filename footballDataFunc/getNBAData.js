const { footballFunc } = require("../footballFunc");
const { basicFunc } = require("../basicFunc");
const { botRollsFunctions } = require("../botRollsFunctions");
const moment = require("moment");

let nbaCycleNum = "0";
let nbaCycleText = "";
let nbaCycleDate = "";
let nbaGames = [];
let nbaGamesList = [];
let nbaCycleIndexNum = 0;
let nbaUsersIndex = [];
let nbaGuessData = [];
let nbaUsersList = [];

const getNBAData = async () => {
  console.log("getNBAData");
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "NBA");
  const res_cycle = await footballFunc.getCycle(Data);
  console.log("res_cycle_nba", res_cycle);
  nbaCycleNum = res_cycle[0];
  nbaCycleText = res_cycle[3];
  console.log("nbaCycleText", nbaCycleText);
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  nbaCycleDate = cycleDate2.replace("-", ".");

  nbaCycleIndexNum = res_cycle[2];

  nbaGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "NBA"
  );
  for (let g = 0; g < nbaGames.length; g++) {
    if (nbaGames[g]._rawData[0] === nbaCycleNum) {
      const team_1 = nbaGames[g]._rawData[1];
      const team_2 = nbaGames[g]._rawData[2];
      const day = nbaGames[g]._rawData[3];
      const date = nbaGames[g]._rawData[4];
      const time = nbaGames[g]._rawData[5];
      const channel = nbaGames[g]._rawData[6];
      const totalScore = nbaGames[g]._rawData[7];
      nbaGamesList.push([team_1, team_2, day, date, time, channel, totalScore]);
    }
  }

  nbaUsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים", "NBA");
  for (let l = 0; l < nbaUsersIndex.length; l++) {
    nbaUsersList.push(nbaUsersIndex[l]._rawData[0]);
  }
  nbaGuessData = await footballFunc.getDataFromSheet("הניחושים", "NBA");

  console.log({ nbaUsersList });

  const data = {
    nbaCycleNum,
    nbaCycleText,
    nbaCycleDate,
    nbaGames,
    nbaGamesList,
    nbaCycleIndexNum,
    nbaUsersIndex,
    nbaGuessData,
    nbaUsersList,
  };
  return data;
};

module.exports = { getNBAData };
