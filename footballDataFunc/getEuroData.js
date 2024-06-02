const { footballFunc } = require("../footballFunc");
const moment = require("moment");

let euroCycleNum = "0";
let euroCycleText = "";
let euroCycleDate = "";
let euroGames = [];
let euroGamesList = [];
let euroCycleIndexNum = 0;
let euroUsersIndex = [];
let euroGuessData = [];
let euroUsersList = [];

const getEuroData = async () => {
  console.log("getEuroData");
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "Euro");
  const res_cycle = await footballFunc.getCycle(Data);
  console.log("res_cycle_euro", res_cycle);
  euroCycleNum = res_cycle[0];
  euroCycleText = res_cycle[3];
  console.log("euroCycleText", euroCycleText);
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  euroCycleDate = cycleDate2.replace("-", ".");

  euroCycleIndexNum = res_cycle[2];

  euroGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Euro"
  );
  for (let g = 0; g < euroGames.length; g++) {
    if (euroGames[g]._rawData[0] === euroCycleNum) {
      const team_1 = euroGames[g]._rawData[1];
      const team_2 = euroGames[g]._rawData[2];
      const day = euroGames[g]._rawData[3];
      const date = euroGames[g]._rawData[4];
      const time = euroGames[g]._rawData[5];
      const channel = euroGames[g]._rawData[6];
      const totalScore = euroGames[g]._rawData[7];
      euroGamesList.push([
        team_1,
        team_2,
        day,
        date,
        time,
        channel,
        totalScore,
      ]);
    }
  }

  euroUsersIndex = await footballFunc.getDataFromSheet(
    "אינדקס משתמשים",
    "Euro"
  );
  for (let l = 0; l < euroUsersIndex.length; l++) {
    euroUsersList.push(euroUsersIndex[l]._rawData[0]);
  }
  euroGuessData = await footballFunc.getDataFromSheet("הניחושים", "Euro");

  console.log({ euroUsersList });

  const data = {
    euroCycleNum,
    euroCycleText,
    euroCycleDate,
    euroGames,
    euroGamesList,
    euroCycleIndexNum,
    euroUsersIndex,
    euroGuessData,
    euroUsersList,
  };
  return data;
};

module.exports = { getEuroData };
