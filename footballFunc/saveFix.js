const { saveData_Full } = require("./saveData_Full");
const { footballFunc } = require("../footballFunc");

const saveFix = async function (
  gameNum,
  score1,
  score2,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum
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
          "ליגת העל",
          "D",
          "E",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "P",
          "Q",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "AB",
          "AC",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "AN",
          "AO",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "AZ",
          "BA",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "BL",
          "BM",
          ScoreTeam1,
          ScoreTeam2
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
          "ליגת העל",
          "BX",
          "BY",
          ScoreTeam1,
          ScoreTeam2
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
