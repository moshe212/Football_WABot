const getData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  const res_cycle = await footballFunc.getCycle(Data);
  cycleNum = res_cycle[0];
  cycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  cycleDate = cycleDate2.replace("-", ".");
  console.log("cycleDate", cycleDate, cycleDate.replace("-", "."));
  cycleIndexNum = res_cycle[2];

  Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
  for (let g = 0; g < Games.length; g++) {
    console.log("Games", Games[g]._rawData[0], cycleNum);
    if (Games[g]._rawData[0] === cycleNum) {
      console.log("Games[g]", Games[g]);
      const team_1 = Games[g]._rawData[1];
      const team_2 = Games[g]._rawData[2];
      GamesList.push([team_1, team_2]);
    }
  }
  console.log("GamesList", cycleNum, GamesList);
  UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים");
  for (let l = 0; l < UsersIndex.length; l++) {
    UsersList.push(UsersIndex[l]._rawData[0]);
  }
  GuessData = await footballFunc.getDataFromSheet("ליגת העל");
  GuessData_Gavia = await footballFunc.getDataFromSheet("גביע המדינה");
};

module.exports = { getData };
