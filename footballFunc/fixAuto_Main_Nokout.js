const { fixMinut_Team_Auto } = require("./fixMinut_Team_Auto");
const { getSavedGuss_Nokout } = require("./getSavedGuss_Nokout");

const fixAuto_Main_Nokout = async function (
  GamesList,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  fileName
) {
  const GuessData_Saved = await getSavedGuss_Nokout(
    user_name,
    UsersIndex,
    cycleIndexNum,
    "שלב הנוקאאוט",
    GamesList,
    fileName
  );
  for (let c = 0; c < GuessData_Saved.length; c++) {
    if (
      GuessData_Saved[c].team1[1] === GuessData_Saved[c].team2[1] &&
      GuessData_Saved[c].minute.replace("*", "") != "פנדלים"
    ) {
      await fixMinut_Team_Auto(
        c + 1,
        "",
        "",
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "",
        "3",
        fileName,
        "שלב הנוקאאוט"
      );
    } else if (
      parseInt(GuessData_Saved[c].team1[1]) >
        parseInt(GuessData_Saved[c].team2[1]) &&
      GuessData_Saved[c].teamUp.replace("*", "") !=
        GuessData_Saved[c].team1[0].replace("*", "")
    ) {
      await fixMinut_Team_Auto(
        c + 1,
        "",
        "",
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        GuessData_Saved[c].team1[0],
        "",
        fileName,
        "שלב הנוקאאוט"
      );
    } else if (
      parseInt(GuessData_Saved[c].team1[1]) <
        parseInt(GuessData_Saved[c].team2[1]) &&
      GuessData_Saved[c].teamUp.replace("*", "") !=
        GuessData_Saved[c].team2[0].replace("*", "")
    ) {
      console.log(
        "GuessData_Saved[c]",
        parseInt(GuessData_Saved[c].team1[1]),
        parseInt(GuessData_Saved[c].team2[1]),
        GuessData_Saved[c].teamUp.replace("*", ""),
        GuessData_Saved[c].team2[0].replace("*", "")
      );
      await fixMinut_Team_Auto(
        c + 1,
        "",
        "",
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        GuessData_Saved[c].team2[0],
        "",
        fileName,
        "שלב הנוקאאוט"
      );
    }
  }
};

module.exports = { fixAuto_Main_Nokout };
