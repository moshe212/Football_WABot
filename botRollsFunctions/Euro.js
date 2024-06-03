const { footballFunc } = require("../footballFunc");
const { shlavHanokOut_Euro } = require("./shlavHanokOut_Euro");

const Euro = async function (
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
  GuessData_ShlavHanokout,
  UsersList
) {
  console.log("stage euro", stage);

  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  let Team1 = "";
  let Team2 = "";
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let GuessData_Saved = [];
  let textMessage = "";

  if ((stage > 266 && stage < 293) || stage === 483) {
    // const tableTextMassage = await footballFunc.getTableTextMassages({
    //   stage,
    //   tableObj,
    // });
    // textMessage1 = tableTextMassage;
    textMessage1 = "עובדים על זה..";
  } else if (stage === 480 || (stage > 578 && stage < 665)) {
    const shlavHanokOutMessages = await shlavHanokOut_Euro(
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
    console.log("else");
    switch (stage) {
      case 258:
        console.log("cycleText", cycleText);
        if (cycleText.includes("מחזור") || cycleText.includes("שלב הנוקאאוט")) {
          const firstMessages = await footballFunc.firstSort(
            stage,
            UsersList,
            user_name,
            UsersIndex,
            cycleDate,
            "Euro"
          );

          textMessage1 = firstMessages[0];
          textMessage2 = firstMessages[1];
          textMessage3 = firstMessages[2];

          break;
        }
      case 996:
        if (cycleNum !== "0" && cycleText.includes("מחזור")) {
          textMessage1 =
            "בחירה מצוינת!" +
            // "\nהדד ליין לשליחת ניחושים למחזור ה- *" +
            // cycleNum +
            // "* הוא עד ה-" +
            // "*" +
            // cycleDate +
            // "*" +
            // " בחצות." +
            // "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו!"+
            "\nאנא הקפידו לשלוח את הניחושים בזמן. לאחר מועד הדד ליין לא יתקבלו ניחושים. שנתחיל?";
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
              "שומעים רגע? כרגע לא ניתן לשלוח ניחושים ליורו שלב הבתים." +
              "\nיכול להיות שניתן לשלוח ניחושים לשלב הנוקאאוט..";
            textMessage2 =
              "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
            break;
          }
        }

      case 481:
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
        textMessage1 = "עובדים על זה כרגע..";
        break;

      case 997:
        textMessage1 =
          "הלינק לקבוצת הווטסאפ הרשמית של *היציע:  יורו 2024* הוא:" +
          "\n https://chat.whatsapp.com/CZyFCQqAvHYJkD8QC2VQPb" +
          "\n קישור לקובץ הלייב - https://docs.google.com/spreadsheets/d/1SgqAiRYXEFdxxu_YQ2RSbYx_JuPtXoW0pff2uLINVFc/edit" +
          "\n קישור לקובץ החוקים והכללים - https://docs.google.com/document/d/1Lde9i31TK3-9FU_9sQuN3zz0IGWnk-t5KNozl0vR3sw/edit";

        break;

      case 1090:
        textMessage1 =
          "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים.שימו לב שאתם עושים זאת לא יאוחר מה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות 😎";

        break;
      case 1089:
        // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");

        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str = "*מחזור " + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str + "\n" + Team1 + " - " + Team2;

        break;
      case 999:
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
          "Euro"
        );

        break;
      case 1002:
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
          "Euro"
        );

        break;
      case 1005:
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
          "Euro"
        );

        break;
      case 1008:
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
          "Euro"
        );

        break;
      case 1011:
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
          "Euro"
        );

        break;
      case 1014:
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
          "Euro"
        );

        break;

      case 1017:
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
          "Euro"
        );

        break;
      case 1020:
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
          "Euro"
        );

        break;
      case 1023:
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
          "Euro"
        );

        break;
      case 1026:
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
          "Euro"
        );

        break;
      case 1029:
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
          "Euro"
        );

        break;

      //-----------------------------------------------------------------------------

      case 1032:
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
          "EF",
          "EG",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Euro"
        );

        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );

        console.log("resSaveIdx", resSaveIdx);
        console.log("textMessage", textMessage);
        console.log("textMessage1", textMessage[0]);
        console.log("textMessage2", textMessage[1]);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];

        break;

      case 1091:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש במחזור הבא.";

        break;

      case 1092:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 1094:
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
          "Euro",
          "שלב הבתים"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;

      case 1095:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
          GuessData_Saved,
          true,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 1096:
        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש במחזור הבא.";

        break;

      case 555:
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
          "Euro",
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro",
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro",
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro",
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro",
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
          GuessData_Saved,
          false,
          cycleNum
        );
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

        break;

      case 1097:
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
          "Euro",
          "שלב הבתים"
        );

        GuessData_Saved = await footballFunc.getSavedScore(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הבתים",
          GamesList,
          "Euro"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFixEuro(
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

module.exports = { Euro };

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
