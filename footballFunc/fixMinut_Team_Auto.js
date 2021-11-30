const { saveData_Full } = require("./saveData_Full");

const fixMinut_Team_Auto = async function (
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
  const TeamUp = teamUp;
  const Minute =
    minute === "1"
      ? "90 דקות"
      : minute === "2"
      ? "120 דקות"
      : minute === "3"
      ? "פנדלים"
      : "";
  try {
    switch (gameNum) {
      case 1:
        console.log("case 1 fixAuto");
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 2:
        console.log("case 2");

        if (TeamUp !== "") {
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
        } else {
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
        }

        break;

      case 3:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;

      case 4:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;

      case 5:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;

      case 6:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;

      case 7:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 8:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 9:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 10:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 11:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 12:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 13:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 14:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 15:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
      case 16:
        if (TeamUp !== "") {
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
        } else {
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
        }

        break;
    }
  } catch (e) {
    console.log("not saved");
    console.log(e);
    return false;
  }
};

module.exports = { fixMinut_Team_Auto };
