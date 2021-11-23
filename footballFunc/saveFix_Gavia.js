const { saveData_Full } = require("./saveData_Full");

const saveFix_Gavia = async function (
  gameNum,
  score1,
  score2,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  teamUp,
  minute
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
  let TeamUp = "";
  let Minute = "";
  try {
    switch (gameNum) {
      case 1:
        console.log("case 1");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "F",
          "G",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "H",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "I",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 2:
        console.log("case 2");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "V",
          "W",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "X",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "Y",
          "",
          "",
          "",
          "",
          Minute
        );

        break;

      case 3:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "AL",
          "AM",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "AN",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "AO",
          "",
          "",
          "",
          "",
          Minute
        );
        break;

      case 4:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BB",
          "BC",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BD",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BE",
          "",
          "",
          "",
          "",
          Minute
        );
        break;

      case 5:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BR",
          "BS",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BT",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BU",
          "",
          "",
          "",
          "",
          Minute
        );

        break;

      case 6:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CH",
          "CI",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CJ",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CK",
          "",
          "",
          "",
          "",
          Minute
        );

        break;

      case 7:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CX",
          "CY",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CZ",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "DA",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 8:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "DN",
          "DO",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "DP",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "DQ",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 9:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "ED",
          "EE",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "EF",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "EG",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 10:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "ET",
          "EU",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "EV",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "EW",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 11:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FJ",
          "FK",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FL",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FM",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 12:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FZ",
          "GA",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GB",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GC",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 13:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GP",
          "GQ",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GR",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GS",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 14:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HF",
          "HG",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HH",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HI",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 15:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HV",
          "HW",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HX",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HY",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
      case 16:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute = minute;
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "IL",
          "IM",
          ScoreTeam1,
          ScoreTeam2
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "IN",
          "",
          "",
          "",
          "",
          TeamUp
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "IO",
          "",
          "",
          "",
          "",
          Minute
        );

        break;
    }
  } catch (e) {
    console.log("not saved");
    console.log(e);
    return false;
  }
};

module.exports = { saveFix_Gavia };
