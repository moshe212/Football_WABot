const { saveData_Full } = require("./saveData_Full");

const saveFix_Nokout = async function (
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
          "שלב הנוקאאוט",
          "F",
          "G",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "H",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "I",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "V",
          "W",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "X",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "Y",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "AL",
          "AM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AN",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AO",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "BB",
          "BC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BD",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BE",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "BR",
          "BS",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BT",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BU",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "CH",
          "CI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CJ",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CK",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "CX",
          "CY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CZ",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DA",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
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
          "שלב הנוקאאוט",
          "DN",
          "DO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DP",
          "",
          "",
          "",
          "",
          TeamUp,
          "Alufot"
        );
        await saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DQ",
          "",
          "",
          "",
          "",
          Minute,
          "Alufot"
        );

        break;
    }
  } catch (e) {
    console.log("not saved");
    console.log(e);
    return false;
  }
};

module.exports = { saveFix_Nokout };
