const { footballFunc } = require("../footballFunc");

const Nba = async function ({
  message,
  cycleDate,
  cycleText,
  cycleNum,
  GamesList,
  cycleIndexNum,
  UsersIndex,
  GuessData,
  user_name,
  stage,
  score,
  UsersList,
}) {
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
  let Day = "";
  let Date = "";
  let Hour = "";
  let Channel = "";
  let ChoiseUp = "";
  let ChoiseUpteam = "";
  let ChoiseMinut = "";
  let Minuts = "";
  let GuessData_Saved = [];
  let textMessage = "";

  let cycle =
    cycleNum === "גמר ומקום 3" ? "משחק הגמר והמשחק על המקום ה-3" : cycleNum;

  console.log("Nba");
  console.log("stage", stage);
  if (stage === 255) {
    console.log("stage-255");
    const firstMessages = await footballFunc.firstSort(
      stage,
      UsersList,
      user_name,
      UsersIndex,
      cycleDate,
      "NBA"
    );

    textMessage1 = firstMessages[0];
    textMessage2 = firstMessages[1];
    textMessage3 = firstMessages[2];
  } else {
    switch (stage) {
      case 802:
        textMessage1 =
          "הנה רשימת הלינקים למשחק" +
          "\nלינק לקובץ הלייב: https://docs.google.com/spreadsheets/d/1SgqAiRYXEFdxxu_YQ2RSbYx_JuPtXoW0pff2uLINVFc/edit" +
          "\nלינק לקובץ החוקים והכללים: https://docs.google.com/document/d/1Lde9i31TK3-9FU_9sQuN3zz0IGWnk-t5KNozl0vR3sw/edit" +
          "\nלינק לקבוצת הוואטסאפ: https://chat.whatsapp.com/CZyFCQqAvHYJkD8QC2VQPb";

        break;

      case 801:
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים ל*שבוע משחקים מספר *" +
          cycle +
          "* הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בשעה 14:00 לכל המאוחר." +
          "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו! שנתחיל?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

        break;

      case 895:
        textMessage1 =
          "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
          "*" +
          cycleDate +
          "*" +
          " בשעה 14:00. יאללה ביי! 😎 ";
        break;

      case 894:
        console.log(GamesList);
        if (cycleText.includes("שלב הנוקאאוט")) {
          Team1 = GamesList[0][0];
          Team2 = GamesList[0][1];
          Day = GamesList[0][2];
          Date = GamesList[0][3];
          Hour = GamesList[0][4];
          Channel = GamesList[0][5];

          console.log("Details:", Team1, Team2, Day, Date, Hour, Channel);

          const str1 =
            cycleNum === "גמר ומקום 3"
              ? "*משחק הגמר*"
              : "*" + cycleNum + ", משחק מספר 1:* ";
          textMessage1 = str1 + "\n" + Team1 + " - " + Team2;
          textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";
        }
        //  else {
        //   textMessage1 = "השתחלתם ללופ של ניחושי גביע המדינה למרות שאי אפשר..";
        //   textMessage1 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
        // }

        break;
      case 583:
        console.log(GamesList);
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str2 =
          cycleNum === "גמר ומקום 3"
            ? "*משחק הגמר*"
            : "*" + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str2 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 586:
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
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str3 =
          cycleNum === "גמר ומקום 3"
            ? "*משחק הגמר*"
            : "*" + cycleNum + ", משחק מספר 1:* ";

        textMessage1 = str3 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;

      case 588:
        console.log(GamesList);
        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "F",
          "I",
          "Mondial"
        );

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

        if (GamesList.length < 2) {
          await footballFunc.saveData_googleAPI(
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
            Minuts,
            "Mondial"
          );
          // ----------Start fix auto----------------
          await footballFunc.fixAuto_Main_Nokout(
            GamesList,
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "Mondial"
          );

          // ----------End fix auto----------------
          GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
            user_name,
            UsersIndex,
            cycleIndexNum,
            "שלב הנוקאאוט",
            GamesList,
            "Mondial"
          );
          console.log("GuessData_Saved", GuessData_Saved);
          textMessage = await footballFunc.chooseGameToFix_Nokout(
            GuessData_Saved,
            false,
            cycleNum
          );

          textMessage1 = textMessage[0];
          textMessage2 = textMessage[1];

          break;
        } else {
          Team1 = GamesList[1][0];
          Team2 = GamesList[1][1];

          const str4 =
            cycleNum === "גמר ומקום 3"
              ? "*המשחק על המקום ה-3*"
              : "*" + cycleNum + ", משחק מספר 2:* ";

          textMessage1 = str4 + "\n" + Team1 + " - " + Team2;
          textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

          footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "I",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );
          break;
        }

      case 590:
        console.log(GamesList);
        Team1 = GamesList[1][0];
        Team2 = GamesList[1][1];

        const str5 =
          cycleNum === "גמר ומקום 3"
            ? "*המשחק על המקום ה-3*"
            : "*" + cycleNum + ", משחק מספר 2:* ";

        textMessage1 = str5 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 593:
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
          "Y",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);

        const str6 =
          cycleNum === "גמר ומקום 3"
            ? "*המשחק על המקום ה-3*"
            : "*" + cycleNum + ", משחק מספר 2:* ";

        textMessage1 = str6 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 595:
        console.log(GamesList);
        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "V",
          "Y",
          "Mondial"
        );
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
        if (GamesList.length < 3) {
          await footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "Y",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );
          // ----------Start fix auto----------------
          await footballFunc.fixAuto_Main_Nokout(
            GamesList,
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "Mondial"
          );

          // ----------End fix auto----------------
          GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
            user_name,
            UsersIndex,
            cycleIndexNum,
            "שלב הנוקאאוט",
            GamesList,
            "Mondial"
          );
          console.log("GuessData_Saved", GuessData_Saved);
          textMessage = await footballFunc.chooseGameToFix_Nokout(
            GuessData_Saved,
            false,
            cycleNum
          );

          textMessage1 = textMessage[0];
          textMessage2 = textMessage[1];

          break;
        } else {
          Team1 = GamesList[2][0];
          Team2 = GamesList[2][1];

          const str7 = "*" + cycleNum + ", משחק מספר 3:* ";
          textMessage1 = str7 + "\n" + Team1 + " - " + Team2;
          textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

          footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "Y",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );

          break;
        }

      case 597:
        console.log(GamesList);
        Team1 = GamesList[2][0];
        Team2 = GamesList[2][1];

        const str8 = "*" + cycleNum + ", משחק מספר 3:* ";
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 600:
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
          "AO",
          "Mondial"
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

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 602:
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];

        const str10 = "*" + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str10 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AL",
          "AO",
          "Mondial"
        );
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

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "AO",
          "",
          "",
          "",
          "",
          Minuts,
          "Mondial"
        );

        break;
      case 604:
        console.log(GamesList);
        Team1 = GamesList[3][0];
        Team2 = GamesList[3][1];

        const str11 = "*" + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str11 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 607:
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
          "BE",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str12 = "*" + cycleNum + ", משחק מספר 4:* ";
        textMessage1 = str12 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
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
          "Mondial"
        );

        break;
      case 609:
        console.log(GamesList);
        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BB",
          "BE",
          "Mondial"
        );
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
        if (GamesList.length < 5) {
          await footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "BE",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );
          // ----------Start fix auto----------------
          await footballFunc.fixAuto_Main_Nokout(
            GamesList,
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "Mondial"
          );

          // ----------End fix auto----------------
          GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
            user_name,
            UsersIndex,
            cycleIndexNum,
            "שלב הנוקאאוט",
            GamesList,
            "Mondial"
          );
          console.log("GuessData_Saved", GuessData_Saved);
          textMessage = await footballFunc.chooseGameToFix_Nokout(
            GuessData_Saved,
            false,
            cycleNum
          );

          textMessage1 = textMessage[0];
          textMessage2 = textMessage[1];

          break;
        } else {
          Team1 = GamesList[4][0];
          Team2 = GamesList[4][1];

          const str13 = "*" + cycleNum + ", משחק מספר 5:* ";
          textMessage1 = str13 + "\n" + Team1 + " - " + Team2;
          textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

          footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "BE",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );

          break;
        }

      case 611:
        console.log(GamesList);
        Team1 = GamesList[4][0];
        Team2 = GamesList[4][1];

        const str14 = "*" + cycleNum + ", משחק מספר 5:* ";
        textMessage1 = str14 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BR",
          "BS",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 614:
        console.log(GamesList);
        Team1 = GamesList[4][0];
        Team2 = GamesList[4][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BR",
          "BU",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str15 = "*" + cycleNum + ", משחק מספר 5:* ";
        textMessage1 = str15 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BT",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Mondial"
        );

        break;
      case 616:
        console.log(GamesList);
        Team1 = GamesList[5][0];
        Team2 = GamesList[5][1];

        const str16 = "*" + cycleNum + ", משחק מספר 6:* ";
        textMessage1 = str16 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BR",
          "BU",
          "Mondial"
        );
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

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "BU",
          "",
          "",
          "",
          "",
          Minuts,
          "Mondial"
        );

        break;
      case 618:
        console.log(GamesList);
        Team1 = GamesList[5][0];
        Team2 = GamesList[5][1];

        const str17 = "*" + cycleNum + ", משחק מספר 6:* ";
        textMessage1 = str17 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CH",
          "CI",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 621:
        console.log(GamesList);
        Team1 = GamesList[5][0];
        Team2 = GamesList[5][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CH",
          "CK",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str18 = "*" + cycleNum + ", משחק מספר 6:* ";
        textMessage1 = str18 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CJ",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Mondial"
        );

        break;
      case 623:
        console.log(GamesList);
        Team1 = GamesList[6][0];
        Team2 = GamesList[6][1];

        const str19 = "*" + cycleNum + ", משחק מספר 7:* ";
        textMessage1 = str19 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CH",
          "CK",
          "Mondial"
        );
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

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CK",
          "",
          "",
          "",
          "",
          Minuts,
          "Mondial"
        );

        break;
      case 625:
        console.log(GamesList);
        Team1 = GamesList[6][0];
        Team2 = GamesList[6][1];

        const str20 = "*" + cycleNum + ", משחק מספר 7:* ";
        textMessage1 = str20 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CX",
          "CY",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 628:
        console.log(GamesList);
        Team1 = GamesList[6][0];
        Team2 = GamesList[6][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CX",
          "DA",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str21 = "*" + cycleNum + ", משחק מספר 7:* ";
        textMessage1 = str21 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CZ",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Mondial"
        );

        break;
      case 630:
        console.log(GamesList);
        Team1 = GamesList[7][0];
        Team2 = GamesList[7][1];

        const str22 = "*" + cycleNum + ", משחק מספר 8:* ";
        textMessage1 = str22 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "CX",
          "DA",
          "Mondial"
        );
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

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DA",
          "",
          "",
          "",
          "",
          Minuts,
          "Mondial"
        );

        break;
      case 632:
        console.log(GamesList);
        Team1 = GamesList[7][0];
        Team2 = GamesList[7][1];

        const str23 = "*" + cycleNum + ", משחק מספר 8:* ";
        textMessage1 = str23 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מי הקבוצה שתעלה לשלב הבא?";
        textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

        // score = message;
        ScoreTeam1 = score.split(":")[1];
        ScoreTeam2 = score.split(":")[0];
        console.log("ScoreTeam1", ScoreTeam1);
        console.log("ScoreTeam2", ScoreTeam2);

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DN",
          "DO",
          ScoreTeam1,
          ScoreTeam2,
          "",
          "",
          "Mondial"
        );

        break;
      case 635:
        console.log(GamesList);
        Team1 = GamesList[7][0];
        Team2 = GamesList[7][1];
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DN",
          "DQ",
          "Mondial"
        );
        console.log("GameRow", GameRow.data);
        const str24 = "*" + cycleNum + ", משחק מספר 8:* ";
        textMessage1 = str24 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "איך יסתיים המשחק?";
        console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
        // console.log(GameRow.data[0][0], GameRow.data[0][1]);
        if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
          textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
        } else {
          textMessage3 = "\n3️⃣ פנדלים";
        }

        ChoiseUp = message;
        if (parseInt(ChoiseUp) === 1) {
          ChoiseUpteam = Team1;
        } else {
          ChoiseUpteam = Team2;
        }

        footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DP",
          "",
          "",
          "",
          "",
          ChoiseUpteam,
          "Mondial"
        );

        break;
      case 637:
        console.log(GamesList);
        ChoiseMinut = message;
        GameRow = await footballFunc.getGameGuss(
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "שלב הנוקאאוט",
          "DN",
          "DQ",
          "Mondial"
        );
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
        if (GamesList.length < 9) {
          await footballFunc.saveData_googleAPI(
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "שלב הנוקאאוט",
            "DQ",
            "",
            "",
            "",
            "",
            Minuts,
            "Mondial"
          );
          // ----------Start fix auto----------------
          await footballFunc.fixAuto_Main_Nokout(
            GamesList,
            user_name,
            UsersIndex,
            GuessData_ShlavHanokout,
            cycleIndexNum,
            "Mondial"
          );

          // ----------End fix auto----------------
          GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
            user_name,
            UsersIndex,
            cycleIndexNum,
            "שלב הנוקאאוט",
            GamesList,
            "Mondial"
          );
          console.log("GuessData_Saved", GuessData_Saved);
          textMessage = await footballFunc.chooseGameToFix_Nokout(
            GuessData_Saved,
            false,
            cycleNum
          );

          textMessage1 = textMessage[0];
          textMessage2 = textMessage[1];

          break;
        }

      // case 166:
      //   console.log(GamesList);
      //   // Team1 = GamesList[14][0];
      //   // Team2 = GamesList[14][1];

      //   // const str50 = "*" + cycleNum + ", משחק מספר 15:* ";
      //   // textMessage1 = str50 + "\n" + Team1 + " - " + Team2;
      //   // textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      //   ChoiseMinut = message;
      //   GameRow = await footballFunc.getGameGuss(
      //     user_name,
      //     UsersIndex,
      //     GuessData_ShlavHanokout,
      //     cycleIndexNum,
      //     "שלב הנוקאאוט",
      //     "IL",
      //     "IO",
      //     "Mondial"
      //   );
      //   if (parseInt(ChoiseMinut) === 1) {
      //     Minuts = "90 דקות";
      //   } else if (parseInt(ChoiseMinut) === 2) {
      //     Minuts = "120 דקות";
      //   } else {
      //     if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
      //       Minuts = "90 דקות*";
      //     } else {
      //       Minuts = "פנדלים";
      //     }
      //   }

      //   await footballFunc.saveData_googleAPI(
      //     user_name,
      //     UsersIndex,
      //     GuessData_ShlavHanokout,
      //     cycleIndexNum,
      //     "שלב הנוקאאוט",
      //     "IO",
      //     "",
      //     "",
      //     "",
      //     "",
      //     Minuts,
      //     "Mondial"
      //   );
      //   // ----------Start fix auto----------------
      //   await footballFunc.fixAuto_Main_Nokout(
      //     GamesList,
      //     user_name,
      //     UsersIndex,
      //     GuessData_ShlavHanokout,
      //     cycleIndexNum
      //   );

      //   // ----------End fix auto----------------
      //   GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
      //     user_name,
      //     UsersIndex,
      //     cycleIndexNum,
      //     "שלב הנוקאאוט",
      //     GamesList
      //   );
      //   console.log("GuessData_Saved", GuessData_Saved);
      //   textMessage = await footballFunc.chooseGameToFix_Nokout(
      //     GuessData_Saved,
      //     false,
      //     cycleNum
      //   );

      //   console.log("textMessage", textMessage);
      //   console.log("textMessage1", textMessage[0]);
      //   console.log("textMessage2", textMessage[1]);
      //   textMessage1 = textMessage[0];
      //   textMessage2 = textMessage[1];

      //   break;
      case 639:
        textMessage1 = "הניחושים נקלטו. שיהיה בהצלחה";
        textMessage2 = "ניפגש במחזור הבא";
        break;

      case 640:
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;
      case 642:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num];
        minute_toFix = message.split(" ")[7];

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
          "Mondial"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;
      case 645:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;
      case 644:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;
      case 647:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
        minute_toFix = message.split(" ")[7];

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
          "Mondial"
        );

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;
      case 650:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;
      case 649:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;
      case 652:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=1---------
      //if GamesList.length = 1 show the gusses and finish
      case 654:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //453
      case 655:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 656:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=2---------
      //if GamesList.length = 2 and choose 1 show the gusses and finish
      case 658:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //if GamesList.length = 2 and choose 2
      case 659:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 660:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
        minute_toFix = message.split(" ")[7];

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
          "Mondial"
        );
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=4---------
      //if GamesList.length = 2 and choose 1 show the gusses and finish
      case 662:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //if GamesList.length = 2 and choose 2
      case 663:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 664:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
        minute_toFix = message.split(" ")[7];

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
          "Mondial"
        );
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;
    }
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { Nba };
