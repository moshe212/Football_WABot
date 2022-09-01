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
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";

        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "F",
          "G",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 2:
        console.log("case 2");
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "V",
          "W",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;

      case 3:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "AL",
          "AM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );
        break;

      case 4:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BB",
          "BC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );
        break;

      case 5:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "BR",
          "BS",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;

      case 6:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CH",
          "CI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;

      case 7:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "CX",
          "CY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 8:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "DN",
          "DO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 9:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "ED",
          "EE",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 10:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "ET",
          "EU",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 11:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FJ",
          "FK",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 12:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "FZ",
          "GA",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 13:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "GP",
          "GQ",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 14:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HF",
          "HG",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 15:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "HV",
          "HW",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
        );

        break;
      case 16:
        ScoreTeam1 = score1;
        ScoreTeam2 = score2;
        TeamUp = teamUp;
        Minute =
          minute === "1"
            ? "90 דקות"
            : minute === "2"
            ? "120 דקות"
            : minute === "3"
            ? "פנדלים"
            : "";
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "IL",
          "IM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "GaviaMedina"
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
          TeamUp,
          "GaviaMedina"
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
          Minute,
          "GaviaMedina"
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
