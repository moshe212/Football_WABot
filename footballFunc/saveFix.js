const { saveData_Full } = require("./saveData_Full");

const saveFix = async function (
  gameNum,
  score1,
  score2,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  fileName,
  sheetTitle
) {
  console.log(
    "fix",
    gameNum,
    score1,
    score2,
    user_name,
    // UsersIndex,
    // GuessData,
    cycleIndexNum
  );
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  try {
    switch (gameNum) {
      case 1:
        console.log("case 1");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "D",
          "E",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 2:
        console.log("case 2");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "P",
          "Q",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;

      case 3:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "AB",
          "AC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;

      case 4:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "AN",
          "AO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;

      case 5:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "AZ",
          "BA",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;

      case 6:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "BL",
          "BM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;

      case 7:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "BX",
          "BY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 8:
        console.log("case 8");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "CJ",
          "CK",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 9:
        console.log("case 9");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "CV",
          "CW",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 10:
        console.log("case 10");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "DH",
          "DI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 11:
        console.log("case 11");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "DT",
          "DU",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 12:
        console.log("case 12");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "EF",
          "EG",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 13:
        console.log("case 13");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "ER",
          "ES",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 14:
        console.log("case 14");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "FD",
          "FE",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 15:
        console.log("case 15");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "FP",
          "FQ",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
      case 16:
        console.log("case 16");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          sheetTitle,
          "GB",
          "GC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          fileName
        );

        break;
    }
  } catch (e) {
    console.log("not saved");
    console.log(e);
    return false;
  }
};

module.exports = { saveFix };
