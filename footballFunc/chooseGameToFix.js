const chooseGameToFix = async function (GuessData_Saved, message2, cycleNum) {
  const textMessage1 = message2
    ? "בחרתם לשנות אחד או יותר מניחושי המחזור ה-" +
      cycleNum +
      "." +
      " בחרו את המשחק והניחוש אותו תרצו לשנות." +
      "\n*משחק 1:*" +
      "\n" +
      GuessData_Saved[0].team1[0] +
      " - " +
      GuessData_Saved[0].team2[0] +
      " " +
      GuessData_Saved[0].team1[1] +
      ":" +
      GuessData_Saved[0].team2[1] +
      "\n*משחק 2:*" +
      "\n" +
      GuessData_Saved[1].team1[0] +
      " - " +
      GuessData_Saved[1].team2[0] +
      " " +
      GuessData_Saved[1].team1[1] +
      ":" +
      GuessData_Saved[1].team2[1] +
      "\n*משחק 3:*" +
      "\n" +
      GuessData_Saved[2].team1[0] +
      " - " +
      GuessData_Saved[2].team2[0] +
      " " +
      GuessData_Saved[2].team1[1] +
      ":" +
      GuessData_Saved[2].team2[1] +
      "\n*משחק 4:*" +
      "\n" +
      GuessData_Saved[3].team1[0] +
      " - " +
      GuessData_Saved[3].team2[0] +
      " " +
      GuessData_Saved[3].team1[1] +
      ":" +
      GuessData_Saved[3].team2[1] +
      "\n*משחק 5:*" +
      "\n" +
      GuessData_Saved[4].team1[0] +
      " - " +
      GuessData_Saved[4].team2[0] +
      " " +
      GuessData_Saved[4].team1[1] +
      ":" +
      GuessData_Saved[4].team2[1] +
      "\n*משחק 6:*" +
      "\n" +
      GuessData_Saved[5].team1[0] +
      " - " +
      GuessData_Saved[5].team2[0] +
      " " +
      GuessData_Saved[5].team1[1] +
      ":" +
      GuessData_Saved[5].team2[1] +
      "\n*משחק 7:*" +
      "\n" +
      GuessData_Saved[6].team1[0] +
      " - " +
      GuessData_Saved[6].team2[0] +
      " " +
      GuessData_Saved[6].team1[1] +
      ":" +
      GuessData_Saved[6].team2[1]
    : "*להלן הניחושים שלכם למחזור ה-" +
      cycleNum +
      ":*" +
      "\n" +
      GuessData_Saved[0].team1[0] +
      " - " +
      GuessData_Saved[0].team2[0] +
      " " +
      GuessData_Saved[0].team1[1] +
      ":" +
      GuessData_Saved[0].team2[1] +
      "\n" +
      GuessData_Saved[1].team1[0] +
      " - " +
      GuessData_Saved[1].team2[0] +
      " " +
      GuessData_Saved[1].team1[1] +
      ":" +
      GuessData_Saved[1].team2[1] +
      "\n" +
      GuessData_Saved[2].team1[0] +
      " - " +
      GuessData_Saved[2].team2[0] +
      " " +
      GuessData_Saved[2].team1[1] +
      ":" +
      GuessData_Saved[2].team2[1] +
      "\n" +
      GuessData_Saved[3].team1[0] +
      " - " +
      GuessData_Saved[3].team2[0] +
      " " +
      GuessData_Saved[3].team1[1] +
      ":" +
      GuessData_Saved[3].team2[1] +
      "\n" +
      GuessData_Saved[4].team1[0] +
      " - " +
      GuessData_Saved[4].team2[0] +
      " " +
      GuessData_Saved[4].team1[1] +
      ":" +
      GuessData_Saved[4].team2[1] +
      "\n" +
      GuessData_Saved[5].team1[0] +
      " - " +
      GuessData_Saved[5].team2[0] +
      " " +
      GuessData_Saved[5].team1[1] +
      ":" +
      GuessData_Saved[5].team2[1] +
      "\n" +
      GuessData_Saved[6].team1[0] +
      " - " +
      GuessData_Saved[6].team2[0] +
      " " +
      GuessData_Saved[6].team1[1] +
      ":" +
      GuessData_Saved[6].team2[1];

  const textMessage2 = message2
    ? "יש להשיב במבנה הבא: " + "*משחק 1 תוצאה 2:1*"
    : "\n 1️⃣ לאישור וסיום \n 2️⃣ לשינוי ועריכה ";

  // const textMessage3 = message2 ? "*משחק 1 תוצאה 1:2*" : "empty";
  const textMessage3 = "empty";

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { chooseGameToFix };
