const { saveData_Full } = require("./saveData_Full");
const { saveData_googleAPI } = require("./saveData_googleAPI");

const fixMinut_Team_Auto = async function (
  gameNum,
  score1,
  score2,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  teamUp,
  minute,
  fileName,
  titleSheet
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
  const TeamUp = teamUp + "*";
  const Minute =
    minute === "1"
      ? "90 דקות*"
      : minute === "2"
      ? "120 דקות*"
      : minute === "3"
      ? "פנדלים*"
      : "";
  try {
    switch (gameNum) {
      case 1:
        console.log("case 1 fixAuto");
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "H",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "I",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 2:
        console.log("case 2");

        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "X",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "Y",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;

      case 3:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "AN",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "AO",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;

      case 4:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "BD",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "BE",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;

      case 5:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "BT",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "BU",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;

      case 6:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "CJ",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "CK",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;

      case 7:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "CZ",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "DA",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 8:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "DP",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "DQ",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 9:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "EF",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "EG",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 10:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "EV",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "EW",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 11:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "FL",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "FM",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 12:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "GB",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "GC",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 13:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "GR",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "GS",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 14:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "HH",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "HI",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 15:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "HX",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "HY",
            "",
            "",
            "",
            "",
            Minute,
            fileName
          );
        }

        break;
      case 16:
        if (teamUp !== "") {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "IN",
            "",
            "",
            "",
            "",
            TeamUp,
            fileName
          );
        } else {
          await saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData,
            cycleIndexNum,
            titleSheet,
            "IO",
            "",
            "",
            "",
            "",
            Minute,
            fileName
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
