const { saveData_Full } = require("./saveData_Full");
const { saveData_googleAPI } = require("./saveData_googleAPI");

const saveFix_Nba = async function ({
  gameNum,
  winNum,
  difference,
  score,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
}) {
  const columnOption = {
    1: { win: "D", difference: "F", score: "H" },
    2: { win: "J", difference: "L", score: "N" },
    3: { win: "P", difference: "R", score: "T" },
    4: { win: "V", difference: "X", score: "Z" },
    5: { win: "AB", difference: "AD", score: "AF" },
    6: { win: "AH", difference: "AJ", score: "AL" },
    7: { win: "AN", difference: "AP", score: "AR" },
    8: { win: "AT", difference: "AV", score: "AX" },
    9: { win: "AZ", difference: "BB", score: "BD" },
    10: { win: "BF", difference: "BH", score: "BJ" },
  };

  saveData_googleAPI(
    user_name,
    UsersIndex,
    GuessData,
    cycleIndexNum,
    "הניחושים",
    columnOption[gameNum].win,
    "",
    "",
    "",
    "",
    winNum,
    "NBA"
  );

  saveData_googleAPI(
    user_name,
    UsersIndex,
    GuessData,
    cycleIndexNum,
    "הניחושים",
    columnOption[gameNum].difference,
    "",
    "",
    "",
    "",
    difference,
    "NBA"
  );

  saveData_googleAPI(
    user_name,
    UsersIndex,
    GuessData,
    cycleIndexNum,
    "הניחושים",
    columnOption[gameNum].score,
    "",
    "",
    "",
    "",
    score,
    "NBA"
  );

  // let ScoreTeam1 = 0;
  // let ScoreTeam2 = 0;
  // let TeamUp = "";
  // let Minute = "";
  // let minuteColumn = "";
  // try {
  //   switch (gameNum) {
  //     case 1:
  //       console.log("case 1");
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";

  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "F",
  //         "G",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );
  //       if (TeamUp !== "") {
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           "H",
  //           "",
  //           "",
  //           "",
  //           "",
  //           TeamUp,
  //           fileName
  //         );
  //       }
  //       if (Minute !== "") {
  //         minuteColumn = fileName === "Mondial" ? "I" : "H";
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           minuteColumn,
  //           "",
  //           "",
  //           "",
  //           "",
  //           Minute,
  //           fileName
  //         );
  //       }

  //       break;
  //     case 2:
  //       console.log("case 2");
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "V",
  //         "W",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );

  //       if (TeamUp !== "") {
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           "X",
  //           "",
  //           "",
  //           "",
  //           "",
  //           TeamUp,
  //           fileName
  //         );
  //       }
  //       if (Minute !== "") {
  //         minuteColumn = fileName === "Mondial" ? "Y" : "X";
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           minuteColumn,
  //           "",
  //           "",
  //           "",
  //           "",
  //           Minute,
  //           fileName
  //         );
  //       }

  //       break;

  //     case 3:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "AL",
  //         "AM",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );

  //       if (TeamUp !== "") {
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           "AN",
  //           "",
  //           "",
  //           "",
  //           "",
  //           TeamUp,
  //           fileName
  //         );
  //       }

  //       if (Minute !== "") {
  //         minuteColumn = fileName === "Mondial" ? "AO" : "AN";
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           minuteColumn,
  //           "",
  //           "",
  //           "",
  //           "",
  //           Minute,
  //           fileName
  //         );
  //       }
  //       break;

  //     case 4:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "BB",
  //         "BC",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );

  //       if (TeamUp !== "") {
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           "BD",
  //           "",
  //           "",
  //           "",
  //           "",
  //           TeamUp,
  //           fileName
  //         );
  //       }

  //       if (Minute !== "") {
  //         minuteColumn = fileName === "Mondial" ? "BE" : "BD";
  //         await saveData_Full(
  //           user_name,
  //           UsersIndex,
  //           GuessData,
  //           cycleIndexNum,
  //           "שלב הנוקאאוט",
  //           minuteColumn,
  //           "",
  //           "",
  //           "",
  //           "",
  //           Minute,
  //           fileName
  //         );
  //       }
  //       break;

  //     case 5:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "BR",
  //         "BS",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "BT",
  //         "",
  //         "",
  //         "",
  //         "",
  //         TeamUp,
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "BU",
  //         "",
  //         "",
  //         "",
  //         "",
  //         Minute,
  //         fileName
  //       );

  //       break;

  //     case 6:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "CH",
  //         "CI",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "CJ",
  //         "",
  //         "",
  //         "",
  //         "",
  //         TeamUp,
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "CK",
  //         "",
  //         "",
  //         "",
  //         "",
  //         Minute,
  //         fileName
  //       );

  //       break;

  //     case 7:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "CX",
  //         "CY",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "CZ",
  //         "",
  //         "",
  //         "",
  //         "",
  //         TeamUp,
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "DA",
  //         "",
  //         "",
  //         "",
  //         "",
  //         Minute,
  //         fileName
  //       );

  //       break;
  //     case 8:
  //       ScoreTeam1 = score1;
  //       ScoreTeam2 = score2;
  //       TeamUp = teamUp;
  //       Minute =
  //         minute === "1"
  //           ? "90 דקות"
  //           : minute === "2"
  //           ? "120 דקות"
  //           : minute === "3"
  //           ? "פנדלים"
  //           : "";
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "DN",
  //         "DO",
  //         ScoreTeam1,
  //         ScoreTeam2,
  //         "",
  //         "",
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "DP",
  //         "",
  //         "",
  //         "",
  //         "",
  //         TeamUp,
  //         fileName
  //       );
  //       await saveData_Full(
  //         user_name,
  //         UsersIndex,
  //         GuessData,
  //         cycleIndexNum,
  //         "שלב הנוקאאוט",
  //         "DQ",
  //         "",
  //         "",
  //         "",
  //         "",
  //         Minute,
  //         fileName
  //       );

  //       break;
  //   }
  // } catch (e) {
  //   console.log("not saved");
  //   console.log(e);
  //   return false;
  // }
};

module.exports = { saveFix_Nba };
