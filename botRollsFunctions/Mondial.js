const { footballFunc } = require("../footballFunc");

const Mondial = async function (
  message,
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
  GuessData_ShlavHanokout,
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
    // const tableTextMassage = await footballFunc.getTableTextMassages({
    //   stage,
    //   tableObj,
    // });
    // textMessage1 = tableTextMassage;
  } else if (stage === 480 || (stage > 394 && stage < 476)) {
    const shlavHanokOutMessages = await shlavHanokOut(
      message,
      cycleDate,
      cycleText,
      cycleNum,
      GamesList,
      cycleIndexNum,
      UsersIndex,
      GuessData,
      GuessData_ShlavHanokout,
      user_name,
      stage,
      score
    );

    textMessage1 = shlavHanokOutMessages[0];
    textMessage2 = shlavHanokOutMessages[1];
    textMessage3 = shlavHanokOutMessages[2];
  } else {
    switch (stage) {
      case 257:
        if (cycleText.includes("מחזור") || cycleText.includes("שלב הנוקאאוט")) {
          const firstMessages = await footballFunc.firstSort(
            stage,
            UsersList,
            user_name,
            UsersIndex,
            cycleDate,
            "Mondial"
          );

          textMessage1 = firstMessages[0];
          textMessage2 = firstMessages[1];
          textMessage3 = firstMessages[2];

          break;
        }
      case 479:
        if (cycleNum !== "0" && cycleText.includes("מחזור")) {
          textMessage1 =
            "בחירה מצוינת!" +
            "\nהדד ליין לשליחת ניחושים למחזור ה- *" +
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
            textMessage3 = "לחזרה לתפריט הקודם הקישו 0️⃣";
            break;
          } else {
            textMessage1 =
              "שומעים רגע? כרגע לא ניתן לשלוח ניחושים לליגת האלופות." +
              "\nיכול להיות שניתן לשלוח ניחושים לשלב הנוקאאוט..";
            textMessage2 =
              "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
            break;
          }
        }

      //   case 481:
      //     const achievementsOfSeason = await footballFunc.getAchievementsOfSeason(
      //       user_name,
      //       AchievementsOfSeasonData,
      //       UsersIndex
      //     );
      //     console.log(achievementsOfSeason);
      //     textMessage1 =
      //       "להלן הישגי העונה שניחשתם:" +
      //       `\n *האלופה:* ${achievementsOfSeason[2].data}` +
      //       `\n *הסגנית:* ${achievementsOfSeason[5].data}` +
      //       `\n *הטוטו:* ${achievementsOfSeason[8].data}` +
      //       `\n *אירופיאיות1:* ${achievementsOfSeason[11].data}` +
      //       `\n *אירופיאיות2:* ${achievementsOfSeason[14].data}` +
      //       `\n *אירופיאיות3:* ${achievementsOfSeason[17].data}` +
      //       `\n *אירופיאיות4:* ${achievementsOfSeason[20].data}` +
      //       `\n *אלופת החורף:* ${achievementsOfSeason[23].data}` +
      //       `\n *המלך:* ${achievementsOfSeason[26].data}` +
      //       `\n *הנסיך:* ${achievementsOfSeason[29].data}` +
      //       `\n *השף:* ${achievementsOfSeason[32].data}` +
      //       `\n *הסו שף:* ${achievementsOfSeason[35].data}` +
      //       `\n *לא נביא:* ${achievementsOfSeason[38].data}` +
      //       `\n *הנה הוא מגיע:* ${achievementsOfSeason[41].data}` +
      //       `\n *יאללה הביתה 1:* ${achievementsOfSeason[44].data}` +
      //       `\n *יאללה הביתה 2:* ${achievementsOfSeason[49].data}` +
      //       `\n *והיא עולה 1:* ${achievementsOfSeason[54].data}` +
      //       `\n *והיא עולה 2:* ${achievementsOfSeason[59].data}` +
      //       `\n *ואלו שמות: מקום 1:* ${achievementsOfSeason[64].data}` +
      //       `\n *ואלו שמות: מקום 2:* ${achievementsOfSeason[65].data}` +
      //       `\n *ואלו שמות: מקום 3:* ${achievementsOfSeason[66].data}` +
      //       `\n *ואלו שמות: מקום 4:* ${achievementsOfSeason[67].data}` +
      //       `\n *ואלו שמות: מקום 5:* ${achievementsOfSeason[68].data}` +
      //       `\n *ואלו שמות: מקום 6:* ${achievementsOfSeason[69].data}` +
      //       `\n *מאוורר:* ${achievementsOfSeason[72].data}` +
      //       `\n *טורנדו:* ${achievementsOfSeason[75].data}` +
      //       `\n *מקום 1:* ${achievementsOfSeason[76].data}` +
      //       `\n *מקום 2:* ${achievementsOfSeason[77].data}` +
      //       `\n *מקום 3:* ${achievementsOfSeason[78].data}` +
      //       `\n *מקום 4:* ${achievementsOfSeason[79].data}` +
      //       `\n *מקום 5:* ${achievementsOfSeason[80].data}` +
      //       `\n *מקום 6:* ${achievementsOfSeason[81].data}` +
      //       `\n *מקום 7:* ${achievementsOfSeason[84].data}` +
      //       `\n *מקום 8:* ${achievementsOfSeason[85].data}` +
      //       `\n *מקום 9:* ${achievementsOfSeason[86].data}` +
      //       `\n *מקום 10:* ${achievementsOfSeason[87].data}` +
      //       `\n *מקום 11:* ${achievementsOfSeason[88].data}` +
      //       `\n *מקום 12:* ${achievementsOfSeason[89].data}` +
      //       `\n *מקום 13:* ${achievementsOfSeason[90].data}` +
      //       `\n *מקום 14:* ${achievementsOfSeason[91].data}`;

      //     break;

      case 482:
        textMessage1 =
          "הלינק לקבוצת הווטסאפ הרשמית של *היציע: ליגת העל* הוא:" +
          "\n https://chat.whatsapp.com/CZyFCQqAvHYJkD8QC2VQPb";

        break;

      //   case 33:
      //     if (cycleNum !== "0") {
      //       textMessage1 =
      //         "בחירה מצוינת!" +
      //         "\nהדד ליין לשליחת ניחושים ל*מחזור ה-" +
      //         cycleNum +
      //         "* הוא עד ה-" +
      //         "*" +
      //         cycleDate +
      //         "*" +
      //         " בחצות." +
      //         "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו! שנתחיל?";
      //       textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

      //       break;
      //     } else {
      //       textMessage1 =
      //         "שומעים רגע? הדד ליין לשליחת הניחושים ל*מחזור ה-" +
      //         cycleNum +
      //         "*" +
      //         " עבר.";
      //       textMessage2 =
      //         "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
      //       break;
      //     }

      //   case 34:
      //     textMessage1 =
      //       "שימו לב: הדד ליין לשליחת הניחושים הוא עד ה-" +
      //       "*" +
      //       cycleDate +
      //       "*" +
      //       " בחצות. \nשניה אחרי זה אני יוצא לחופש עד המחזור הבא, אז אל תאחרו! שנתחיל?";
      //     textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

      //     break;

      //   case 35:
      //     textMessage1 =
      //       "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
      //       "*" +
      //       cycleDate +
      //       "*" +
      //       " בחצות. יאללה ביי! 😎 ";
      //     break;

      case 485:
      case 396:
        textMessage1 =
          "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים.שימו לב שאתם עושים זאת לא יאוחר מה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות 😎";

        break;
      case 484:
        // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");

        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str = "*מחזור " + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str + "\n" + Team1 + " - " + Team2;

        break;
      case 488:
        console.log(GamesList);
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];

        const str2 = "*מחזור " + cycleNum + ", משחק מספר 2:* ";
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
          "שלב הבתים",
          "D",
          "E",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 491:
        console.log(GamesList);
        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];

        const str3 = "*מחזור " + cycleNum + ", משחק מספר 3:* ";
        textMessage1 = str3 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "P",
          "Q",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 494:
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];

        const str4 = "*מחזור " + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str4 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "AB",
          "AC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 497:
        console.log(GamesList);
        Team1 = GamesList[4][0];
        Team2 = GamesList[4][1];

        const str5 = "*מחזור " + cycleNum + ", משחק מספר 5:* ";
        textMessage1 = str5 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "AN",
          "AO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 500:
        console.log(GamesList);
        Team1 = GamesList[5][0];
        Team2 = GamesList[5][1];

        const str6 = "*מחזור " + cycleNum + ", משחק מספר 6:* ";
        textMessage1 = str6 + "\n" + Team1 + " - " + Team2;
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "AZ",
          "BA",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 503:
        console.log(GamesList);

        Team1 = GamesList[6][0];
        Team2 = GamesList[6][1];

        const str7 = "*מחזור " + cycleNum + ", משחק מספר 7:* ";
        textMessage1 = str7 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "BL",
          "BM",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;

      case 506:
        console.log(GamesList);
        Team1 = GamesList[7][0];
        Team2 = GamesList[7][1];

        const str8 = "*מחזור " + cycleNum + ", משחק מספר 8:* ";
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "BX",
          "BY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 509:
        console.log(GamesList);
        Team1 = GamesList[8][0];
        Team2 = GamesList[8][1];

        const str9 = "*מחזור " + cycleNum + ", משחק מספר 9:* ";
        textMessage1 = str9 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "CJ",
          "CK",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 512:
        console.log(GamesList);
        Team1 = GamesList[9][0];
        Team2 = GamesList[9][1];

        const str10 = "*מחזור " + cycleNum + ", משחק מספר 10:* ";
        textMessage1 = str10 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "CV",
          "CW",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 515:
        console.log(GamesList);
        Team1 = GamesList[10][0];
        Team2 = GamesList[10][1];

        const str11 = "*מחזור " + cycleNum + ", משחק מספר 11:* ";
        textMessage1 = str11 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "DH",
          "DI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 518:
        console.log(GamesList);
        Team1 = GamesList[11][0];
        Team2 = GamesList[11][1];

        const str12 = "*מחזור " + cycleNum + ", משחק מספר 12:* ";
        textMessage1 = str12 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "DT",
          "DU",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 521:
        console.log(GamesList);
        Team1 = GamesList[12][0];
        Team2 = GamesList[12][1];

        const str13 = "*מחזור " + cycleNum + ", משחק מספר 13:* ";
        textMessage1 = str13 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "EF",
          "EG",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 524:
        console.log(GamesList);
        Team1 = GamesList[13][0];
        Team2 = GamesList[13][1];

        const str14 = "*מחזור " + cycleNum + ", משחק מספר 14:* ";
        textMessage1 = str14 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "ER",
          "ES",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 527:
        console.log(GamesList);
        Team1 = GamesList[14][0];
        Team2 = GamesList[14][1];

        const str15 = "*מחזור " + cycleNum + ", משחק מספר 15:* ";
        textMessage1 = str15 + "\n" + Team1 + " - " + Team2;

        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "FD",
          "FE",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 530:
        console.log(GamesList);
        Team1 = GamesList[15][0];
        Team2 = GamesList[15][1];

        const str16 = "*מחזור " + cycleNum + ", משחק מספר 16:* ";
        textMessage1 = str16 + "\n" + Team1 + " - " + Team2;
        textMessage2 =
          "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה שניות לעבד את הנתונים ולהציג את ניחושי המחזור המלאים ששלחתם. במידה ולא קיבלתם ממני סיכום של הניחושים לאחר 2 דקות, אנא שילחו שוב את הניחוש למשחק האחרון.";
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "FP",
          "FQ",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      //-----------------------------------------------------------------------------

      case 533:
        // score = req.body.query.message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        // GuessData = await footballFunc.getDataFromSheet("שלב הבתים");

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "שלב הבתים",
          "GB",
          "GC",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
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
          "Mondial"
        );

        console.log("resSaveIdx", resSaveIdx);
        console.log("textMessage", textMessage);
        console.log("textMessage1", textMessage[0]);
        console.log("textMessage2", textMessage[1]);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];

        break;

      case 537:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 539:
        // case 478:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 542:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 543:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש במחזור הבא.";

        break;

      case 545:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 548:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];
        break;

      case 549:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 551:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 554:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];
        break;

      case 555:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 557:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 560:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];
        break;

      case 561:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 563:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 566:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];
        break;

      case 567:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 569:
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
          "Mondial",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 572:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];
        break;

      case 573:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 575:
        // gameNum = req.body.query.message.split(" ")[1];
        // score1 = req.body.query.message.split(" ")[3].split(":")[1];
        // score2 = req.body.query.message.split(" ")[3].split(":")[0];
        console.log("answer", score1, score2, gameNum);

        await footballFunc.saveFix(
          parseInt(gameNum),
          parseInt(score1),
          parseInt(score2),
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "Mondial",
          "שלב הבתים"
        );

        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixAlufot(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;
    }
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { LigatAlufot };

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

module.exports = { Mondial };
