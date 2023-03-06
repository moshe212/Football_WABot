const chooseGameToFix_Nokout = async function (
  GuessData_Saved,
  message2,
  cycleNum,
  cycleText,
  fileName
) {
  let fullStr = "";
  for (let i = 0; i < GuessData_Saved.length; i++) {
    const endStr =
      fileName === "Mondial"
        ? "*\n*" +
          GuessData_Saved[i].teamUp +
          "* עולה, ב-" +
          "*" +
          GuessData_Saved[i].minute +
          "*\n"
        : fileName === "Alufot" && cycleText.includes("UP")
        ? "\n*" + GuessData_Saved[i].teamUp + "*" + " עולה"
        : fileName === "Alufot" && cycleText.includes("TIME")
        ? "*\n" + GuessData_Saved[i].minute
        : "";
    const str =
      "\n" +
      GuessData_Saved[i].team1[0] +
      " - " +
      GuessData_Saved[i].team2[0] +
      " " +
      GuessData_Saved[i].team2[1] +
      ":" +
      GuessData_Saved[i].team1[1] +
      endStr +
      "\n";

    fullStr = fullStr + str;
  }

  let fullStrfIX = "";
  for (let f = 0; f < GuessData_Saved.length; f++) {
    const endStrFix =
      fileName === "Mondial"
        ? "*\n*" +
          GuessData_Saved[i].teamUp +
          "* עולה, ב-" +
          "*" +
          GuessData_Saved[i].minute +
          "*\n"
        : fileName === "Alufot" && cycleText.includes("UP")
        ? "\n*" + GuessData_Saved[f].teamUp + "*" + " עולה"
        : fileName === "Alufot" && cycleText.includes("TIME")
        ? "\n*" + GuessData_Saved[f].minute
        : "";
    const strfIX =
      "\n" +
      "\n*משחק " +
      (f + 1) +
      "*" +
      "\n" +
      GuessData_Saved[f].team1[0] +
      " - " +
      GuessData_Saved[f].team2[0] +
      " " +
      GuessData_Saved[f].team2[1] +
      ":" +
      GuessData_Saved[f].team1[1] +
      endStrFix;

    fullStrfIX = fullStrfIX + strfIX;
  }

  const cycle =
    cycleNum === "גמר ומקום 3" ? "משחק הגמר והמשחק על המקום ה-3" : cycleNum;

  const textMessage1 = message2
    ? "בחרתם לשנות אחד או יותר מניחושי שלב-" +
      cycleNum +
      "." +
      " בחרו את המשחק והניחוש אותו תרצו לשנות." +
      fullStrfIX
    : "*להלן הניחושים שלכם לשלב-" + cycle + ":*" + "\n" + fullStr;

  const TextMsg2 =
    fileName === "Mondial"
      ? "עליכם להשיב במבנה הבא: " +
        "\n" +
        "*משחק 1 תוצאה 2:1 עולה 1 זמן 2*" +
        "\nפרמטר הזמן: \n*1* 90 דקות \n*2* 120 דקות \n*3* פנדלים"
      : fileName === "Alufot" && cycleText.includes("TIME")
      ? "עליכם להשיב במבנה הבא: " +
        "\n" +
        "*משחק 1 תוצאה 2:1 זמן 2*" +
        "\nפרמטר הזמן: \n*1* 90 דקות \n*2* 120 דקות \n*3* פנדלים"
      : fileName === "Alufot" && cycleText.includes("UP")
      ? "עליכם להשיב במבנה הבא: " + "\n" + "*משחק 1 תוצאה 2:1 עולה 1*"
      : "";
  const textMessage2 = message2
    ? TextMsg2
    : "\n 1️⃣ לאישור וסיום \n 2️⃣ לשינוי ועריכה ";

  // const textMessage3 = message2 ? "*משחק 1 תוצאה 1:2*" : "empty";
  const textMessage3 = "empty";

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { chooseGameToFix_Nokout };
