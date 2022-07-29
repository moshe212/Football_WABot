const { footballFunc } = require("../footballFunc");

const LigatAl = async function ({
  cycleNum,
  cycleText,
  cycleDate,
  GamesList,
  cycleIndexNum,
  UsersIndex,
  GuessData,
  user_name,
  stage,
}) {
  let gameNum = 0;
  let score1 = 0;
  let score2 = 0;
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  let Team1 = "";
  let Team2 = "";
  let score = "";
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let GuessData_Saved = [];
  let textMessage = "";

  switch (stage) {
    case 110:
      if (cycleNum !== "0" && cycleText.includes("מחזור")) {
        textMessage1 =
          "ברוכים הבאים למשחק *היציע:ליגת העל* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - להישגי העונה שלכם \n3️⃣ - לקבוצת ה-Whatsapp הרשמית \n4️⃣ - לטבלאות (בקרוב) \n5️⃣ - לחזרה לתפריט הראשי";

        break;
      }
    case 249:
      if (cycleNum !== "0" && cycleText.includes("מחזור")) {
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים למחזור *" +
          cycleNum +
          "* הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות." +
          "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו! שנתחיל?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

        break;
      } else {
        if (cycleText.includes("מחזור")) {
          textMessage1 =
            "שומעים רגע? הדד ליין לשליחת הניחושים למחזור " +
            "*" +
            cycleNum +
            "*" +
            " עבר.";
          textMessage2 =
            "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
          break;
        } else {
          textMessage1 =
            "שומעים רגע? כרגע לא ניתן לשלוח ניחושים לליגת העל." +
            "\nיכול להיות שניתן לשלוח ניחושים לגביע המדינה..";
          textMessage2 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
          break;
        }
      }

    case 250:
      textMessage1 = "כתבנו בקרוב, אז למה לבזבז לנו משאבים: 😊";
      break;

    case 251:
      textMessage1 =
        "הלינק לקבוצה הוא: \n https://chat.whatsapp.com/CZyFCQqAvHYJkD8QC2VQPb";
      break;

    case 252:
      textMessage1 = "כתבנו בקרוב, אז למה לבזבז לנו משאבים: 😊";
      break;

    case 33:
      if (cycleNum !== "0") {
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים ל*מחזור ה-" +
          cycleNum +
          "* הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות." +
          "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו! שנתחיל?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

        break;
      } else {
        textMessage1 =
          "שומעים רגע? הדד ליין לשליחת הניחושים ל*מחזור ה-" +
          cycleNum +
          "*" +
          " עבר.";
        textMessage2 =
          "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
        break;
      }

    case 34:
      textMessage1 =
        "שימו לב: הדד ליין לשליחת הניחושים הוא עד ה-" +
        "*" +
        cycleDate +
        "*" +
        " בחצות. \nשניה אחרי זה אני יוצא לחופש עד המחזור הבא, אז אל תאחרו! שנתחיל?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

      break;

    case 35:
      textMessage1 =
        "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
        "*" +
        cycleDate +
        "*" +
        " בחצות. יאללה ביי! 😎 ";
      break;
    case 38:
      textMessage1 =
        "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים.שימו לב שאתם עושים זאת לא יאוחר מה-" +
        "*" +
        cycleDate +
        "*" +
        " בחצות 😎";

      break;
    case 37:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");

      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];

      const str = "*מחזור " + cycleNum + ", משחק מספר 1:* ";
      textMessage1 = str + "\n" + Team1 + " - " + Team2;

      break;
    case 46:
      console.log(GamesList);
      Team1 = GamesList[1][0];
      Team2 = GamesList[1][1];

      const str2 = "*מחזור " + cycleNum + ", משחק מספר 2:* ";
      textMessage1 = str2 + "\n" + Team1 + " - " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "D",
        "E",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 47:
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];

      const str3 = "*מחזור " + cycleNum + ", משחק מספר 3:* ";
      textMessage1 = str3 + "\n" + Team1 + " - " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "P",
        "Q",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 48:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];

      const str4 = "*מחזור " + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str4 + "\n" + Team1 + " - " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "AB",
        "AC",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 49:
      console.log(GamesList);
      Team1 = GamesList[4][0];
      Team2 = GamesList[4][1];

      const str5 = "*מחזור " + cycleNum + ", משחק מספר 5:* ";
      textMessage1 = str5 + "\n" + Team1 + " - " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "AN",
        "AO",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 50:
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];

      const str6 = "*מחזור " + cycleNum + ", משחק מספר 6:* ";
      textMessage1 = str6 + "\n" + Team1 + " - " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "AZ",
        "BA",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 51:
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];

      const str7 = "*מחזור " + cycleNum + ", משחק מספר 7:* ";
      textMessage1 = str7 + "\n" + Team1 + " - " + Team2;
      textMessage2 =
        "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה שניות לעבד את הנתונים ולהציג את ניחושי המחזור המלאים ששלחתם. במידה ולא קיבלתם ממני סיכום של הניחושים לאחר 2 דקות, אנא שילחו שוב את הניחוש למשחק האחרון.";
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "BL",
        "BM",
        ScoreTeam1,
        ScoreTeam2
      );

      break;

    case 64:
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum,
        "ליגת העל",
        "BX",
        "BY",
        ScoreTeam1,
        ScoreTeam2
      );

      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );

      const resSaveIdx = await footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        null,
        null,
        "אינדקס משתמשים",
        null,
        null,
        null,
        null,
        true
      );

      console.log("resSaveIdx", resSaveIdx);
      console.log("textMessage", textMessage);
      console.log("textMessage1", textMessage[0]);
      console.log("textMessage2", textMessage[1]);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];

      break;

    case 68:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;

    case 69:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 70:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;

    case 71:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש במחזור הבא.";

      break;

    case 72:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 73:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];
      break;

    case 74:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;

    case 79:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 82:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];
      break;

    case 83:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;

    case 84:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 87:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];
      break;

    case 88:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;

    case 89:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 92:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];
      break;

    case 93:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;

    case 94:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 97:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        true,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];
      break;

    case 98:
      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;

    case 99:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      console.log("answer", score1, score2, gameNum);

      await footballFunc.saveFix(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData,
        cycleIndexNum
      );

      GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix(
        GuessData_Saved,
        false,
        cycleNum
      );
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { LigatAl };