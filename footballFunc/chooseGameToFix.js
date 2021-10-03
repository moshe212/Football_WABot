const chooseGameToFix = async function (GuessData_Saved, message2, cycleNum) {
  const textMessage1 =
    "אלו הניחושים שלכם למחזור  " +
    cycleNum +
    " : " +
    "\n משחק 1: " +
    GuessData_Saved[0].team1[0] +
    " - " +
    GuessData_Saved[0].team2[0] +
    ":" +
    GuessData_Saved[0].team1[1] +
    ":" +
    GuessData_Saved[0].team2[1] +
    "\n משחק 2: " +
    GuessData_Saved[1].team1[0] +
    " - " +
    GuessData_Saved[1].team2[0] +
    ":" +
    GuessData_Saved[1].team1[1] +
    ":" +
    GuessData_Saved[1].team2[1] +
    "\n משחק 3: " +
    GuessData_Saved[2].team1[0] +
    " - " +
    GuessData_Saved[2].team2[0] +
    ":" +
    GuessData_Saved[2].team1[1] +
    ":" +
    GuessData_Saved[2].team2[1] +
    "\n משחק 4: " +
    GuessData_Saved[3].team1[0] +
    " - " +
    GuessData_Saved[3].team2[0] +
    ":" +
    GuessData_Saved[3].team1[1] +
    ":" +
    GuessData_Saved[3].team2[1] +
    "\n משחק 5: " +
    GuessData_Saved[4].team1[0] +
    " - " +
    GuessData_Saved[4].team2[0] +
    ":" +
    GuessData_Saved[4].team1[1] +
    ":" +
    GuessData_Saved[4].team2[1] +
    "\n משחק 6: " +
    GuessData_Saved[5].team1[0] +
    " - " +
    GuessData_Saved[5].team2[0] +
    ":" +
    GuessData_Saved[5].team1[1] +
    ":" +
    GuessData_Saved[5].team2[1] +
    "\n משחק 7: " +
    GuessData_Saved[6].team1[0] +
    " - " +
    GuessData_Saved[6].team2[0] +
    ":" +
    GuessData_Saved[6].team1[1] +
    ":" +
    GuessData_Saved[6].team2[1];

  const textMessage2 = message2
    ? " נא להשיב במבנה הבא: "
    : "\n 1️⃣ לאישור \n2️⃣ לשינוי או תיקון";

  const textMessage3 = message2 ? "משחק 1 תוצאה 1:2" : "empty";

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { chooseGameToFix };
