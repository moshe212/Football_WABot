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
  euroCycleNum = res_cycle[0];
  euroCycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  euroCycleDate = cycleDate2.replace("-", ".");

  euroCycleIndexNum = res_cycle[2];

  euroGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Euro"
  );

  console.log("res_cycle", res_cycle);
  for (let g = 0; g < euroGames.length; g++) {
    if (euroGames[g]._rawData[0] === euroCycleNum) {
      const team_1 = euroGames[g]._rawData[1];
      const team_2 = euroGames[g]._rawData[2];
      euroGamesList.push([team_1, team_2]);
    }
  }

  euroUsersIndex = await footballFunc.getDataFromSheet(
    "אינדקס משתמשים",
    "Euro"
  );
  for (let l = 0; l < euroUsersIndex.length; l++) {
    euroUsersList.push(euroUsersIndex[l]._rawData[0]);
  }
  euroGuessData = await footballFunc.getDataFromSheet("שלב הבתים", "Euro");
  euroGuessData_ShlavHanokout = await footballFunc.getDataFromSheet(
    "שלב הנוקאאוט",
    "Euro"
  );

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
    euroGuessData_ShlavHanokout,
  };
  return data;
};

module.exports = { getEuroData };
