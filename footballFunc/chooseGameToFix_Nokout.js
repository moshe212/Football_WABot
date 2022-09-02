const chooseGameToFix_Nokout = async function (
  GuessData_Saved,
  message2,
  cycleNum
) {
  let fullStr = "";
  for (let i = 0; i < GuessData_Saved.length; i++) {
    const str =
      "\n" +
      GuessData_Saved[i].team1[0] +
      " - " +
      GuessData_Saved[i].team2[0] +
      " *" +
      GuessData_Saved[i].team2[1] +
      ":" +
      GuessData_Saved[i].team1[1] +
      "*\n*" +
      GuessData_Saved[i].teamUp +
      "* עולה, ב-" +
      "*" +
      GuessData_Saved[i].minute +
      "*\n";

    fullStr = fullStr + str;
  }

  let fullStrfIX = "";
  for (let f = 0; f < GuessData_Saved.length; f++) {
    const strfIX =
      "\n" +
      "\n*משחק " +
      (f + 1) +
      "*" +
      "\n" +
      GuessData_Saved[f].team1[0] +
      " - " +
      GuessData_Saved[f].team2[0] +
      " *" +
      GuessData_Saved[f].team2[1] +
      ":" +
      GuessData_Saved[f].team1[1] +
      "*\n*" +
      GuessData_Saved[f].teamUp +
      "* עולה, ב-" +
      "*" +
      GuessData_Saved[f].minute +
      "*\n";

    fullStrfIX = fullStrfIX + strfIX;
  }

  const textMessage1 = message2
    ? "בחרתם לשנות אחד או יותר מניחושי שלב-" +
      cycleNum +
      "." +
      " בחרו את המשחק והניחוש אותו תרצו לשנות." +
      fullStrfIX
    : "*להלן הניחושים שלכם לשלב-" + cycleNum + ":*" + "\n" + fullStr;

  const textMessage2 = message2
    ? "יש להשיב במבנה הבא: " +
      "*משחק 1 תוצאה 2:1 עולה 1 זמן 2*" +
      "\nפרמטר הזמן: \n*1* 90 דקות \n*2* 120 דקות \n*3* פנדלים"
    : "\n 1️⃣ לאישור וסיום \n 2️⃣ לשינוי ועריכה ";

  // const textMessage3 = message2 ? "*משחק 1 תוצאה 1:2*" : "empty";
  const textMessage3 = "empty";

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { chooseGameToFix_Nokout };
