const { footballFunc } = require("../footballFunc");

const Olami = async function (
  cycleNum,
  cycleText,
  cycleDate,
  GamesList,
  cycleIndexNum,
  UsersIndex,
  GuessData,
  user_name,
  stage,
  score,
  gameNum,
  score1,
  score2,
  AchievementsOfSeasonData,
  tableObj,
  UsersList
) {
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  let Team1 = "";
  let Team2 = "";
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let GuessData_Saved = [];
  let textMessage = "";

  if ((stage > 266 && stage < 293) || stage === 252) {
    const tableTextMassage = await footballFunc.getTableTextMassages({
      stage,
      tableObj,
    });
    textMessage1 = tableTextMassage;
  } else {
    console.log("stage", cycleText);
    switch (stage) {
      case 700:
        if (cycleText.includes("מחזור")) {
          const firstMessages = await footballFunc.firstSort(
            stage,
            UsersList,
            user_name,
            UsersIndex,
            cycleDate,
            "Olami"
          );

          textMessage1 = firstMessages[0];
          textMessage2 = firstMessages[1];
          textMessage3 = firstMessages[2];

          break;
        }
      case 772:
        if (cycleNum !== "0" && cycleText.includes("מחזור")) {
          textMessage1 =
            "בחירה מצוינת!" +
            "\nהדד ליין לשליחת ניחושים לשבוע המשחקים ה-*" +
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
              "שומעים רגע? הדד ליין לשליחת הניחושים לשבוע המשחקים ה-" +
              "*" +
              cycleNum +
              "*" +
              " עבר.";
            textMessage2 =
              "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
            textMessage3 = "לחזרה לתפריט הקודם הקישו 0️⃣";
            break;
          } else {
            textMessage1 =
              "שומעים רגע? כרגע לא ניתן לשלוח ניחושים לכדורגל עולמי.";
            // + "\nיכול להיות שניתן לשלוח ניחושים לגביע המדינה..";
            textMessage2 =
              "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
            break;
          }
        }

      case 250:
        const achievementsOfSeason = await footballFunc.getAchievementsOfSeason(
          user_name,
          AchievementsOfSeasonData,
          UsersIndex
        );
        console.log(achievementsOfSeason);
        textMessage1 =
          "להלן הישגי העונה שניחשתם:" +
          `\n *האלופה:* ${achievementsOfSeason[2].data}` +
          `\n *הסגנית:* ${achievementsOfSeason[5].data}` +
          `\n *הטוטו:* ${achievementsOfSeason[8].data}` +
          `\n *אירופיאיות1:* ${achievementsOfSeason[11].data}` +
          `\n *אירופיאיות2:* ${achievementsOfSeason[14].data}` +
          `\n *אירופיאיות3:* ${achievementsOfSeason[17].data}` +
          `\n *אירופיאיות4:* ${achievementsOfSeason[20].data}` +
          `\n *אלופת החורף:* ${achievementsOfSeason[23].data}` +
          `\n *המלך:* ${achievementsOfSeason[26].data}` +
          `\n *הנסיך:* ${achievementsOfSeason[29].data}` +
          `\n *השף:* ${achievementsOfSeason[32].data}` +
          `\n *הסו שף:* ${achievementsOfSeason[35].data}` +
          `\n *לא נביא:* ${achievementsOfSeason[38].data}` +
          `\n *הנה הוא מגיע:* ${achievementsOfSeason[41].data}` +
          `\n *יאללה הביתה 1:* ${achievementsOfSeason[44].data}` +
          `\n *יאללה הביתה 2:* ${achievementsOfSeason[49].data}` +
          `\n *והיא עולה 1:* ${achievementsOfSeason[54].data}` +
          `\n *והיא עולה 2:* ${achievementsOfSeason[59].data}` +
          `\n *ואלו שמות: מקום 1:* ${achievementsOfSeason[64].data}` +
          `\n *ואלו שמות: מקום 2:* ${achievementsOfSeason[65].data}` +
          `\n *ואלו שמות: מקום 3:* ${achievementsOfSeason[66].data}` +
          `\n *ואלו שמות: מקום 4:* ${achievementsOfSeason[67].data}` +
          `\n *ואלו שמות: מקום 5:* ${achievementsOfSeason[68].data}` +
          `\n *ואלו שמות: מקום 6:* ${achievementsOfSeason[69].data}` +
          `\n *מאוורר:* ${achievementsOfSeason[72].data}` +
          `\n *טורנדו:* ${achievementsOfSeason[75].data}` +
          `\n *מקום 1:* ${achievementsOfSeason[76].data}` +
          `\n *מקום 2:* ${achievementsOfSeason[77].data}` +
          `\n *מקום 3:* ${achievementsOfSeason[78].data}` +
          `\n *מקום 4:* ${achievementsOfSeason[79].data}` +
          `\n *מקום 5:* ${achievementsOfSeason[80].data}` +
          `\n *מקום 6:* ${achievementsOfSeason[81].data}` +
          `\n *מקום 7:* ${achievementsOfSeason[84].data}` +
          `\n *מקום 8:* ${achievementsOfSeason[85].data}` +
          `\n *מקום 9:* ${achievementsOfSeason[86].data}` +
          `\n *מקום 10:* ${achievementsOfSeason[87].data}` +
          `\n *מקום 11:* ${achievementsOfSeason[88].data}` +
          `\n *מקום 12:* ${achievementsOfSeason[89].data}` +
          `\n *מקום 13:* ${achievementsOfSeason[90].data}` +
          `\n *מקום 14:* ${achievementsOfSeason[91].data}`;

        break;

      case 773:
        textMessage1 =
          "קישור לקבוצת הוואטסאפ: " +
          "\n https://chat.whatsapp.com/9vAhNyagyxhJnpujEKqJV8" +
          "\n" +
          "\n קישור לקובץ הלייב: - https://docs.google.com/spreadsheets/d/1SgqAiRYXEFdxxu_YQ2RSbYx_JuPtXoW0pff2uLINVFc/edit" +
          "\n" +
          "\n קישור לקובץ החוקים והכללים: - https://docs.google.com/document/d/1Lde9i31TK3-9FU_9sQuN3zz0IGWnk-t5KNozl0vR3sw/edit";

        textMessage2 = "0️⃣ לחזרה לתפריט הקודם";
        break;

      case 701:
        if (cycleNum !== "0") {
          textMessage1 =
            "בחירה מצוינת!" +
            "\nהדד ליין לשליחת ניחושים ל*שבוע המשחקים ה-" +
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
            "שומעים רגע? הדד ליין לשליחת הניחושים ל*שבוע המשחקים ה-" +
            cycleNum +
            "*" +
            " עבר.";
          textMessage2 =
            "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
          break;
        }

      case 702:
        textMessage1 =
          "שימו לב: הדד ליין לשליחת הניחושים הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות. \nשניה אחרי זה אני יוצא לחופש עד המחזור הבא, אז אל תאחרו! שנתחיל?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

        break;

      case 703:
        textMessage1 =
          "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות. יאללה ביי! 😎 ";
        break;
      case 706:
        textMessage1 =
          "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים.שימו לב שאתם עושים זאת לא יאוחר מה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות 😎";

        break;
      case 705:
        // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");

        console.log(GamesList);

        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];
        Text1 = GamesList[0][2];
        Text2 = GamesList[0][3];
        Text3 = GamesList[0][4];

        const str = `*משחק מספר 1: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str + "\n" + Team1 + " - " + Team2;

        break;
      case 709:
        console.log(GamesList);

        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];
        Text1 = GamesList[1][2];
        Text2 = GamesList[1][3];
        Text3 = GamesList[1][4];

        const str2 = `*משחק מספר 2: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str2 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "D",
          "E",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;
      case 710:
        console.log(GamesList);

        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];
        Text1 = GamesList[2][2];
        Text2 = GamesList[2][3];
        Text3 = GamesList[2][4];

        const str3 = `*משחק מספר 3: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str3 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "P",
          "Q",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;
      case 711:
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];
        Text1 = GamesList[3][2];
        Text2 = GamesList[3][3];
        Text3 = GamesList[3][4];

        const str4 = `*משחק מספר 4: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str4 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "AB",
          "AC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;
      case 712:
        console.log(GamesList);
        Team1 = GamesList[4][0];
        Team2 = GamesList[4][1];
        Text1 = GamesList[4][2];
        Text2 = GamesList[4][3];
        Text3 = GamesList[4][4];

        const str5 = `משחק מספר *5: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str5 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "AN",
          "AO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;
      case 713:
        console.log(GamesList);
        Team1 = GamesList[5][0];
        Team2 = GamesList[5][1];
        Text1 = GamesList[5][2];
        Text2 = GamesList[5][3];
        Text3 = GamesList[5][4];

        const str6 = `*משחק מספר 6: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str6 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "AZ",
          "BA",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;

      case 714:
        console.log(GamesList);
        Team1 = GamesList[6][0];
        Team2 = GamesList[6][1];
        Text1 = GamesList[6][2];
        Text2 = GamesList[6][3];
        Text3 = GamesList[6][4];

        const str7 = `*משחק מספר 7: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str7 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "BL",
          "BM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;

      case 775:
        console.log(GamesList);
        Team1 = GamesList[7][0];
        Team2 = GamesList[7][1];
        Text1 = GamesList[7][2];
        Text2 = GamesList[7][3];
        Text3 = GamesList[7][4];

        const str8 = `*משחק מספר 8: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "BX",
          "BY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;

      case 776:
        console.log(GamesList);
        Team1 = GamesList[8][0];
        Team2 = GamesList[8][1];
        Text1 = GamesList[8][2];
        Text2 = GamesList[8][3];
        Text3 = GamesList[8][4];

        const str9 = `*משחק מספר 9: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str9 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "CJ",
          "CK",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;

      case 777:
        console.log(GamesList);
        Team1 = GamesList[9][0];
        Team2 = GamesList[9][1];
        Text1 = GamesList[9][2];
        Text2 = GamesList[9][3];
        Text3 = GamesList[9][4];

        const str10 = `*משחק מספר 10: ${Text1 ? Text1 : ""}${
          Text2 ? " " + Text2 : ""
        }${Text3 ? " " + Text3 : ""}*`;
        textMessage1 = str10 + "\n" + Team1 + " - " + Team2;
        textMessage2 =
          "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה שניות לעבד את הנתונים ולהציג את ניחושי המחזור המלאים ששלחתם. במידה ולא קיבלתם ממני סיכום של הניחושים לאחר 2 דקות, אנא שילחו שוב את הניחוש למשחק האחרון.";
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "CV",
          "CW",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        break;

      case 778:
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("הניחושים");

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "DH",
          "DI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Olami"
        );

        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "הניחושים",
          GamesList,
          "Olami"
        );

        textMessage = await footballFunc.chooseGameToFix_Olami(
          GuessData_Saved,
          false,
          cycleNum
        );

        const resSaveIdx = await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          null,
          null,
          "אינדקס משתמשים",
          null,
          null,
          null,
          null,
          true,
          "",
          "Olami"
        );

        console.log("resSaveIdx", resSaveIdx);
        console.log("textMessage", textMessage);
        console.log("textMessage1", textMessage[0]);
        console.log("textMessage2", textMessage[1]);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];

        break;

      case 780:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "הניחושים",
          GamesList,
          "Olami"
        );

        textMessage = await footballFunc.chooseGameToFix_Olami(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 781:
        // gameNum = req.body.query.message.split(" ")[1];
        // score1 = req.body.query.message.split(" ")[3].split(":")[1];
        // score2 = req.body.query.message.split(" ")[3].split(":")[0];
        console.log("answer", score1, score2, gameNum);

        footballFunc.saveFix(
          parseInt(gameNum),
          parseInt(score1),
          parseInt(score2),
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "Olami",
          "הניחושים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 782:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "הניחושים",
          GamesList,
          "Olami"
        );

        textMessage = await footballFunc.chooseGameToFix_Olami(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 783:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "הניחושים",
          GamesList,
          "Olami"
        );

        textMessage = await footballFunc.chooseGameToFix_Olami(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש במחזור הבא.";

        break;

      // case 72:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      //   textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      //   break;

      // case 73:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     true,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];
      //   textMessage3 = textMessage[2];
      //   break;

      case 785:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "הניחושים",
          GamesList,
          "Olami"
        );

        textMessage = await footballFunc.chooseGameToFix_Olami(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      // case 79:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      //   textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      //   break;

      // case 82:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     true,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];
      //   textMessage3 = textMessage[2];
      //   break;

      // case 83:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      //   break;

      // case 84:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      //   textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      //   break;

      // case 87:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     true,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];
      //   textMessage3 = textMessage[2];
      //   break;

      // case 88:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      //   break;

      // case 89:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      //   textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      //   break;

      // case 92:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     true,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];
      //   textMessage3 = textMessage[2];
      //   break;

      // case 93:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      //   break;

      // case 94:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      //   textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      //   break;

      // case 97:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     true,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];
      //   textMessage3 = textMessage[2];
      //   break;

      // case 98:
      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      //   break;

      // case 99:
      //   // gameNum = req.body.query.message.split(" ")[1];
      //   // score1 = req.body.query.message.split(" ")[3].split(":")[1];
      //   // score2 = req.body.query.message.split(" ")[3].split(":")[0];
      //   console.log("answer", score1, score2, gameNum);

      //   await footballFunc.saveFix(
      //     parseInt(gameNum),
      //     parseInt(score1),
      //     parseInt(score2),
      //     user_name,
      //     UsersIndex,
      //     GuessData,
      //     cycleIndexNum,
      //     "Olami",
      //     "הניחושים"
      //   );

      //   GuessData_Saved = await footballFunc.getSavedScore(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "הניחושים",
      //     GamesList,
      //     "Olami"
      //   );

      //   textMessage = await footballFunc.chooseGameToFix_Olami(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );
      //   textMessage1 = textMessage[0];
      //   textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

      //   break;
    }
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { Olami };

const isPositiveInteger = (str) => {
  // if (typeof str !== "string") {
  //   return false;
  // }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
};
