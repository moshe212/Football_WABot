const { footballFunc } = require("../footballFunc");

const shlavHanokOut = async function (
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
) {
  let teamUp_ToFix = "";
  let minute_toFix = "";
  let teamUp_ToFix_Num = "";
  let GameRow;
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  let Team1 = "";
  let Team2 = "";
  let ChoiseUp = "";
  let ChoiseUpteam = "";
  let ChoiseMinut = "";
  let Minuts = "";
  let GuessData_Saved = [];
  let textMessage = "";
  let score1 = "";
  let score2 = "";

  switch (stage) {
    case 297:
      console.log({ cycleText });
      if (cycleNum !== "0" && cycleText.includes("שלב הנוקאאוט")) {
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים לשלב הנוקאאוט, שלב *" +
          cycleNum +
          "* הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בחצות." +
          "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו!";
        textMessage2 =
          "*שימו לב*: קיימת קורולציה בין השאלות. אנא הקפידו לבחור את הקבוצה שעולה בהתאם לקבוצה שמנצחת, וכן לבחור באופציית הפנדלים עבור משחק שמסתיים בתיקו. אם לא תעשו זאת, המערכת תתקן בצורה אוטומטית. שנתחיל?";
        textMessage3 = "\n 1️⃣ כן \n2️⃣ לא";

        break;
      } else {
        if (cycleText.includes("שלב הנוקאאוט")) {
          textMessage1 =
            "שומעים רגע? הדד ליין לשליחת הניחושים לשלב" +
            "*" +
            cycleNum +
            "*" +
            " עבר.";
          textMessage2 =
            "אם רק עכשיו נזכרתם לשלוח ניחושים אז אנחנו בבעיה. אנא פנו למנהל המערכת";
          break;
        } else {
          textMessage1 =
            "שומעים רגע? כרגע לא ניתן לשלוח ניחושים לשלב הנוקאאוט.";
          textMessage2 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
          break;
        }
      }
    case 395:
      console.log(GamesList);
      if (cycleText.includes("שלב הנוקאאוט")) {
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str1 = "*" + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str1 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";
      }
      //  else {
      //   textMessage1 = "השתחלתם ללופ של ניחושי גביע המדינה למרות שאי אפשר..";
      //   textMessage1 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
      // }

      break;
    case 398:
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      await footballFunc.saveData_googleAPI(
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
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

      if (cycleText.includes("UP")) {
        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str2 = "*" + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str2 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;
      } else {
        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "F",
          "I",
          "Alufot"
        );
        console.log("GameRow", GameRow.data);
        const str3 = "*" + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str3 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }
      }

      break;

    case 401:
      if (GamesList.length < 2) {
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_ShlavHanokout,
          false,
          cycleNum,
          cycleText,
          "Alufot"
        );

        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
      } else {
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];

        const str4 = "*" + cycleNum + ", משחק מספר 2:* ";
        textMessage1 = str4 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";
      }

      if (cycleText.includes("UP")) {
        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];
        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "H",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Alufot"
        );
        break;
      } else {
        ChoiseMinut = message;
        if (parseInt(ChoiseMinut) === 1) {
          Minuts = "90 דקות";
        } else if (parseInt(ChoiseMinut) === 2) {
          Minuts = "120 דקות";
        } else {
          if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
            Minuts = "90 דקות*";
          } else {
            Minuts = "פנדלים";
          }
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "H",
          "",
          "",
          "",
          "",
          Minuts,
          "Alufot"
        );
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "F",
          "H",
          "Alufot"
        );

        break;
      }

    case 403:
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      await footballFunc.saveData_googleAPI(
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
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

      if (cycleText.includes("UP")) {
        console.log(GamesList);
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];

        const str5 = "*" + cycleNum + ", משחק מספר 2:* ";
        textMessage1 = str5 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        break;
      } else {
        console.log(GamesList);
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "V",
          "X",
          "Alufot"
        );
        console.log("GameRow", GameRow.data);
        const str6 = "*" + cycleNum + ", משחק מספר 2:* ";
        textMessage1 = str6 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }
        break;
      }

    case 405:
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];

      const str7 = "*" + cycleNum + ", משחק מספר 3:* ";
      textMessage1 = str7 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      if (cycleText.includes("UP")) {
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];
        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "X",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Alufot"
        );

        break;
      } else {
        console.log(GamesList);
        ChoiseMinut = message;
        if (parseInt(ChoiseMinut) === 1) {
          Minuts = "90 דקות";
        } else if (parseInt(ChoiseMinut) === 2) {
          Minuts = "120 דקות";
        } else {
          if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
            Minuts = "90 דקות*";
          } else {
            Minuts = "פנדלים";
          }
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "X",
          "",
          "",
          "",
          "",
          Minuts,
          "Alufot"
        );

        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "V",
          "X",
          "Alufot"
        );

        break;
      }

    case 407:
      console.log(GamesList);
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      await footballFunc.saveData_googleAPI(
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
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

      if (cycleText.includes("UP")) {
        console.log(GamesList);
        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];

        const str8 = "*" + cycleNum + ", משחק מספר 3:* ";
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;
      } else {
        console.log(GamesList);
        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AL",
          "AN",
          "Alufot"
        );
        console.log("GameRow", GameRow.data);
        const str9 = "*" + cycleNum + ", משחק מספר 3:* ";
        textMessage1 = str9 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }
      }

      break;
    case 409:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];

      const str10 = "*" + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str10 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      if (cycleText.includes("UP")) {
        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];
        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AN",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Alufot"
        );

        break;
      } else {
        console.log(GamesList);
        ChoiseMinut = message;
        if (parseInt(ChoiseMinut) === 1) {
          Minuts = "90 דקות";
        } else if (parseInt(ChoiseMinut) === 2) {
          Minuts = "120 דקות";
        } else {
          if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
            Minuts = "90 דקות*";
          } else {
            Minuts = "פנדלים";
          }
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AN",
          "",
          "",
          "",
          "",
          Minuts,
          "Alufot"
        );

        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AL",
          "AN",
          "Alufot"
        );

        break;
      }

    case 411:
      console.log(GamesList);
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      await footballFunc.saveData_googleAPI(
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
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

      if (cycleText.includes("UP")) {
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];

        const str8 = "*" + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;
      } else {
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BB",
          "BD",
          "Alufot"
        );
        console.log("GameRow", GameRow.data);
        const str9 = "*" + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str9 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }
      }

      break;

    case 413:
      console.log(GamesList);
      if (cycleText.includes("UP")) {
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];
        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BD",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Alufot"
        );
      } else {
        console.log(GamesList);
        ChoiseMinut = message;
        if (parseInt(ChoiseMinut) === 1) {
          Minuts = "90 דקות";
        } else if (parseInt(ChoiseMinut) === 2) {
          Minuts = "120 דקות";
        } else {
          if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
            Minuts = "90 דקות*";
          } else {
            Minuts = "פנדלים";
          }
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BD",
          "",
          "",
          "",
          "",
          Minuts,
          "Alufot"
        );

        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BB",
          "BD",
          "Alufot"
        );
      }
      // ----------Start fix auto----------------
      // await footballFunc.fixAuto_Main_Nokout(
      //   GamesList,
      //   user_name,
      //   UsersIndex,
      //   GuessData_ShlavHanokout,
      //   cycleIndexNum,
      //   "Alufot"
      // );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "שלב הנוקאאוט",
        GamesList,
        "Alufot"
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Nokout(
        GuessData_ShlavHanokout,
        false,
        cycleNum,
        cycleText,
        "Alufot"
      );

      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];

      break;
    case 415:
      textMessage1 = "הניחושים נקלטו. שיהיה בהצלחה";
      textMessage2 = "ניפגש במחזור הבא";
      break;

    case 666:
    case 671:
      GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "שלב הנוקאאוט",
        GamesList,
        "Alufot"
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Nokout(
        GuessData_ShlavHanokout,
        true,
        cycleNum,
        cycleText,
        "Alufot"
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;

    case 668:
    case 669:
      gameNum = message.split(" ")[1];
      score1 = message.split(" ")[3].split(":")[1];
      score2 = message.split(" ")[3].split(":")[0];

      console.log("gameNum", gameNum);
      console.log("GamesList", GamesList);
      console.log("parse", parseInt(message.split(" ")[5]));
      console.log(
        "gm",
        GamesList[parseInt(gameNum) - 1][parseInt(teamUp_ToFix_Num) - 1]
      );

      if (cycleText.includes("UP")) {
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix =
          GamesList[parseInt(gameNum) - 1][parseInt(teamUp_ToFix_Num) - 1];
      } else if (cycleText.includes("TIME")) {
        minute_toFix = message.split(" ")[5];
      }

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      footballFunc.saveFix_Nokout(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix,
        "Alufot"
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;

    case 672:
    case 686:
    case 692:
      GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "שלב הנוקאאוט",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Nokout(
        GuessData_ShlavHanokout,
        false,
        cycleNum,
        cycleText,
        "Alufot"
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;

    case 685:
    case 677:
    case 691:
      GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "שלב הנוקאאוט",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Nokout(
        GuessData_ShlavHanokout,
        true,
        cycleNum,
        cycleText,
        "Alufot"
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;

    case 696:
    case 697:
    case 678:
    case 683:
    case 684:
    case 674:
    case 675:
    case 688:
    case 689:
    case 693:
    case 694:
      gameNum = message.split(" ")[1];
      score1 = message.split(" ")[3].split(":")[1];
      score2 = message.split(" ")[3].split(":")[0];

      if (cycleText.includes("UP")) {
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix =
          GamesList[parseInt(gameNum) - 1][parseInt(teamUp_ToFix_Num) - 1];
      } else if (cycleText.includes("TIME")) {
        minute_toFix = message.split(" ")[5];
      }

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      await footballFunc.saveFix_Nokout(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_ShlavHanokout,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix,
        "Alufot"
      );

      GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "שלב הנוקאאוט",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Nokout(
        GuessData_ShlavHanokout,
        false,
        cycleNum,
        cycleText,
        "Alufot"
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
  }
  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { shlavHanokOut };
