const { footballFunc } = require("../footballFunc");

const GviaHamedina = async function ({
  cycleNum,
  GamesList,
  cycleIndexNum,
  UsersIndex,
  GuessData,
  GuessData_Gavia,
  user_name,
  stage,
  score,
}) {
  let gameNum = 0;
  let score1 = 0;
  let score2 = 0;
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

  switch (stage) {
    case 111:
      if (cycleNum !== "0" && cycleText.includes("גביע המדינה")) {
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים לגביע המדינה, שלב *" +
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
        if (cycleText.includes("גביע המדינה")) {
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
            "שומעים רגע? כרגע לא ניתן לשלוח ניחושים לגביע המדינה." +
            "\nיכול להיות שניתן לשלוח ניחושים לליגת העל..";
          textMessage2 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
          break;
        }
      }
    case 112:
      console.log(GamesList);
      if (cycleText.includes("גביע המדינה")) {
        Team1 = GamesList[0][0];
        Team2 = GamesList[0][1];

        const str8 = "*" + cycleNum + ", משחק מספר 1:* ";
        textMessage1 = str8 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";
      } else {
        textMessage1 = "השתחלתם ללופ של ניחושי גביע המדינה למרות שאי אפשר..";
        textMessage1 = "אנא פנו למנהל המערכת או בחרו 3️⃣ לחזרה לתפריט הקודם..";
      }

      break;
    case 114:
      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];

      const str9 = "*" + cycleNum + ", משחק מספר 1:* ";
      textMessage1 = str9 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "F",
        "G",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 117:
      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];

      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "F",
        "I"
      );
      console.log("GameRow", GameRow.data);
      const str10 = "*" + cycleNum + ", משחק מספר 1:* ";
      textMessage1 = str10 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "H",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;

    case 120:
      console.log(GamesList);
      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "F",
        "I"
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
        await footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "גביע המדינה",
          "I",
          "",
          "",
          "",
          "",
          Minuts
        );
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "גביע המדינה",
          GamesList
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Gavia(
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

        const str11 = "*" + cycleNum + ", משחק מספר 2:* ";
        textMessage1 = str11 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "I",
          "",
          "",
          "",
          "",
          Minuts
        );
        break;
      }

    case 122:
      console.log(GamesList);
      Team1 = GamesList[1][0];
      Team2 = GamesList[1][1];

      const str12 = "*" + cycleNum + ", משחק מספר 2:* ";
      textMessage1 = str12 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "V",
        "W",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 123:
      console.log(GamesList);
      Team1 = GamesList[1][0];
      Team2 = GamesList[1][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "V",
        "Y"
      );
      console.log("GameRow", GameRow.data);
      const str13 = "*" + cycleNum + ", משחק מספר 2:* ";
      textMessage1 = str13 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "X",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 124:
      console.log(GamesList);
      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "V",
        "Y"
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
        await footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "Y",
          "",
          "",
          "",
          "",
          Minuts
        );
        GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "גביע המדינה",
          GamesList
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Gavia(
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

        const str14 = "*" + cycleNum + ", משחק מספר 3:* ";
        textMessage1 = str14 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "Y",
          "",
          "",
          "",
          "",
          Minuts
        );

        break;
      }

    case 125:
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];

      const str15 = "*" + cycleNum + ", משחק מספר 3:* ";
      textMessage1 = str15 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "AL",
        "AM",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 126:
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "AL",
        "AO"
      );
      console.log("GameRow", GameRow.data);
      const str16 = "*" + cycleNum + ", משחק מספר 3:* ";
      textMessage1 = str16 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "AN",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 127:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];

      const str17 = "*" + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str17 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "AL",
        "AO"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "AO",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 128:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];

      const str18 = "*" + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str18 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BB",
        "BC",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 129:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BB",
        "BE"
      );
      console.log("GameRow", GameRow.data);
      const str19 = "*" + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str19 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BD",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 130:
      console.log(GamesList);
      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BB",
        "BE"
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
        await footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "BE",
          "",
          "",
          "",
          "",
          Minuts
        );
        GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "גביע המדינה",
          GamesList
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Gavia(
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

        const str20 = "*" + cycleNum + ", משחק מספר 5:* ";
        textMessage1 = str20 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "BE",
          "",
          "",
          "",
          "",
          Minuts
        );

        break;
      }

    case 131:
      console.log(GamesList);
      Team1 = GamesList[4][0];
      Team2 = GamesList[4][1];

      const str21 = "*" + cycleNum + ", משחק מספר 5:* ";
      textMessage1 = str21 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BR",
        "BS",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 132:
      console.log(GamesList);
      Team1 = GamesList[4][0];
      Team2 = GamesList[4][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BR",
        "BU"
      );
      console.log("GameRow", GameRow.data);
      const str22 = "*" + cycleNum + ", משחק מספר 5:* ";
      textMessage1 = str22 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BT",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 133:
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];

      const str56 = "*" + cycleNum + ", משחק מספר 6:* ";
      textMessage1 = str56 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BR",
        "BU"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "BU",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 134:
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];

      const str57 = "*" + cycleNum + ", משחק מספר 6:* ";
      textMessage1 = str57 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CH",
        "CI",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 135:
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CH",
        "CK"
      );
      console.log("GameRow", GameRow.data);
      const str58 = "*" + cycleNum + ", משחק מספר 6:* ";
      textMessage1 = str58 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CJ",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 136:
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];

      const str59 = "*" + cycleNum + ", משחק מספר 7:* ";
      textMessage1 = str59 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CH",
        "CK"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CK",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 137:
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];

      const str60 = "*" + cycleNum + ", משחק מספר 7:* ";
      textMessage1 = str60 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CX",
        "CY",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 138:
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CX",
        "DA"
      );
      console.log("GameRow", GameRow.data);
      const str61 = "*" + cycleNum + ", משחק מספר 7:* ";
      textMessage1 = str61 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CZ",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 139:
      console.log(GamesList);
      Team1 = GamesList[7][0];
      Team2 = GamesList[7][1];

      const str23 = "*" + cycleNum + ", משחק מספר 8:* ";
      textMessage1 = str23 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "CX",
        "DA"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "DA",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 140:
      console.log(GamesList);
      Team1 = GamesList[7][0];
      Team2 = GamesList[7][1];

      const str24 = "*" + cycleNum + ", משחק מספר 8:* ";
      textMessage1 = str24 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "DN",
        "DO",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 141:
      console.log(GamesList);
      Team1 = GamesList[7][0];
      Team2 = GamesList[7][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "DN",
        "DQ"
      );
      console.log("GameRow", GameRow.data);
      const str25 = "*" + cycleNum + ", משחק מספר 8:* ";
      textMessage1 = str25 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "DP",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 142:
      console.log(GamesList);
      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "DN",
        "DQ"
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
        await footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "DQ",
          "",
          "",
          "",
          "",
          Minuts
        );
        GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "גביע המדינה",
          GamesList
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Gavia(
          GuessData_Saved,
          false,
          cycleNum
        );

        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];

        break;
      } else {
        Team1 = GamesList[8][0];
        Team2 = GamesList[8][1];

        const str26 = "*" + cycleNum + ", משחק מספר 9:* ";
        textMessage1 = str26 + "\n" + Team1 + " - " + Team2;
        textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

        footballFunc.saveDate_googleAPI(
          user_name,
          UsersIndex,
          GuessData_Gavia,
          cycleIndexNum,
          "גביע המדינה",
          "DQ",
          "",
          "",
          "",
          "",
          Minuts
        );

        break;
      }

    case 143:
      console.log(GamesList);
      Team1 = GamesList[8][0];
      Team2 = GamesList[8][1];

      const str27 = "*" + cycleNum + ", משחק מספר 9:* ";
      textMessage1 = str27 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ED",
        "EE",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 144:
      console.log(GamesList);
      Team1 = GamesList[8][0];
      Team2 = GamesList[8][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ED",
        "EG"
      );
      console.log("GameRow", GameRow.data);
      const str28 = "*" + cycleNum + ", משחק מספר 9:* ";
      textMessage1 = str28 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "EF",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 145:
      console.log(GamesList);
      Team1 = GamesList[9][0];
      Team2 = GamesList[9][1];

      const str29 = "*" + cycleNum + ", משחק מספר 10:* ";
      textMessage1 = str29 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ED",
        "EG"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "EG",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 146:
      console.log(GamesList);
      Team1 = GamesList[9][0];
      Team2 = GamesList[9][1];

      const str30 = "*" + cycleNum + ", משחק מספר 10:* ";
      textMessage1 = str30 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ET",
        "EU",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 147:
      console.log(GamesList);
      Team1 = GamesList[9][0];
      Team2 = GamesList[9][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ET",
        "EW"
      );
      console.log("GameRow", GameRow.data);
      const str31 = "*" + cycleNum + ", משחק מספר 10:* ";
      textMessage1 = str31 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "EV",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 148:
      console.log(GamesList);
      Team1 = GamesList[10][0];
      Team2 = GamesList[10][1];

      const str32 = "*" + cycleNum + ", משחק מספר 11:* ";
      textMessage1 = str32 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "ET",
        "EW"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "EW",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 149:
      console.log(GamesList);
      Team1 = GamesList[10][0];
      Team2 = GamesList[10][1];

      const str33 = "*" + cycleNum + ", משחק מספר 11:* ";
      textMessage1 = str33 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FJ",
        "FK",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 150:
      console.log(GamesList);
      Team1 = GamesList[10][0];
      Team2 = GamesList[10][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FJ",
        "FM"
      );
      console.log("GameRow", GameRow.data);
      const str34 = "*" + cycleNum + ", משחק מספר 11:* ";
      textMessage1 = str34 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FL",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 151:
      console.log(GamesList);
      Team1 = GamesList[11][0];
      Team2 = GamesList[11][1];

      const str35 = "*" + cycleNum + ", משחק מספר 12:* ";
      textMessage1 = str35 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FJ",
        "FM"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FM",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 152:
      console.log(GamesList);
      Team1 = GamesList[11][0];
      Team2 = GamesList[11][1];

      const str36 = "*" + cycleNum + ", משחק מספר 12:* ";
      textMessage1 = str36 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FZ",
        "GA",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 153:
      console.log(GamesList);
      Team1 = GamesList[11][0];
      Team2 = GamesList[11][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FZ",
        "GC"
      );
      console.log("GameRow", GameRow.data);
      const str37 = "*" + cycleNum + ", משחק מספר 12:* ";
      textMessage1 = str37 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GB",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 154:
      console.log(GamesList);
      Team1 = GamesList[12][0];
      Team2 = GamesList[12][1];

      const str38 = "*" + cycleNum + ", משחק מספר 13:* ";
      textMessage1 = str38 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "FZ",
        "GC"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GC",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 155:
      console.log(GamesList);
      Team1 = GamesList[12][0];
      Team2 = GamesList[12][1];

      const str39 = "*" + cycleNum + ", משחק מספר 13:* ";
      textMessage1 = str39 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GP",
        "GQ",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 156:
      console.log(GamesList);
      Team1 = GamesList[12][0];
      Team2 = GamesList[12][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GP",
        "GS"
      );
      console.log("GameRow", GameRow.data);
      const str40 = "*" + cycleNum + ", משחק מספר 13:* ";
      textMessage1 = str40 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GR",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 157:
      console.log(GamesList);
      Team1 = GamesList[13][0];
      Team2 = GamesList[13][1];

      const str41 = "*" + cycleNum + ", משחק מספר 14:* ";
      textMessage1 = str41 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GP",
        "GS"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "GS",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 158:
      console.log(GamesList);
      Team1 = GamesList[13][0];
      Team2 = GamesList[13][1];

      const str42 = "*" + cycleNum + ", משחק מספר 14:* ";
      textMessage1 = str42 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HF",
        "HG",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 159:
      console.log(GamesList);
      Team1 = GamesList[13][0];
      Team2 = GamesList[13][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HF",
        "HI"
      );
      console.log("GameRow", GameRow.data);
      const str43 = "*" + cycleNum + ", משחק מספר 14:* ";
      textMessage1 = str43 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HH",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 160:
      console.log(GamesList);
      Team1 = GamesList[14][0];
      Team2 = GamesList[14][1];

      const str44 = "*" + cycleNum + ", משחק מספר 15:* ";
      textMessage1 = str44 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HF",
        "HI"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HI",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 161:
      console.log(GamesList);
      Team1 = GamesList[14][0];
      Team2 = GamesList[14][1];

      const str45 = "*" + cycleNum + ", משחק מספר 15:* ";
      textMessage1 = str45 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HV",
        "HW",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 162:
      console.log(GamesList);
      Team1 = GamesList[14][0];
      Team2 = GamesList[14][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HV",
        "HY"
      );
      console.log("GameRow", GameRow.data);
      const str46 = "*" + cycleNum + ", משחק מספר 15:* ";
      textMessage1 = str46 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      console.log(GameRow.data.values[0][0], GameRow.data.values[0][1]);
      // console.log(GameRow.data[0][0], GameRow.data[0][1]);
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage3 = "\n3️⃣ פנדלים";
      }

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HX",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 163:
      console.log(GamesList);
      Team1 = GamesList[15][0];
      Team2 = GamesList[15][1];

      const str47 = "*" + cycleNum + ", משחק מספר 16:* ";
      textMessage1 = str47 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HV",
        "HY"
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

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "HY",
        "",
        "",
        "",
        "",
        Minuts
      );

      break;
    case 164:
      console.log(GamesList);
      Team1 = GamesList[15][0];
      Team2 = GamesList[15][1];

      const str48 = "*" + cycleNum + ", משחק מספר 16:* ";
      textMessage1 = str48 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      // score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "IL",
        "IM",
        ScoreTeam1,
        ScoreTeam2
      );

      break;
    case 165:
      console.log(GamesList);
      Team1 = GamesList[15][0];
      Team2 = GamesList[15][1];
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "IL",
        "IO"
      );
      console.log("GameRow", GameRow.data);
      const str49 = "*" + cycleNum + ", משחק מספר 16:* ";
      textMessage1 = str49 + "\n" + Team1 + " - " + Team2;
      if (GameRow.data.values[0][0] != GameRow.data.values[0][1]) {
        textMessage2 = "איך יסתיים המשחק?" + "\n1️⃣ 90 דקות \n2️⃣ 120 דקות";
      } else {
        textMessage2 =
          "איך יסתיים המשחק?" + "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";
      }

      textMessage3 =
        "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה דקות לעבד את הנתונים ולהציג את ניחושי השלב המלאים ששלחתם. במידה ולא קיבלתם ממני סיכום של הניחושים לאחר 5 דקות, אנא שילחו שוב את הניחוש לשאלה האחרונה.";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "IN",
        "",
        "",
        "",
        "",
        ChoiseUpteam
      );

      break;
    case 166:
      console.log(GamesList);
      // Team1 = GamesList[14][0];
      // Team2 = GamesList[14][1];

      // const str50 = "*" + cycleNum + ", משחק מספר 15:* ";
      // textMessage1 = str50 + "\n" + Team1 + " - " + Team2;
      // textMessage2 = "מה תהיה תוצאת המשחק בתום הזמן החוקי?";

      ChoiseMinut = req.body.query.message;
      GameRow = await footballFunc.getGameGuss(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "IL",
        "IO"
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

      await footballFunc.saveDate_googleAPI(
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        "גביע המדינה",
        "IO",
        "",
        "",
        "",
        "",
        Minuts
      );
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );

      console.log("textMessage", textMessage);
      console.log("textMessage1", textMessage[0]);
      console.log("textMessage2", textMessage[1]);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];

      break;
    case 173:
      textMessage1 = "הניחושים נקלטו. שיהיה בהצלחה";
      break;
    case 174:
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 175:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      teamUp_ToFix_Num = parseInt(req.body.query.message.split(" ")[5]);
      teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num];
      minute_toFix = req.body.query.message.split(" ")[7];

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      footballFunc.saveFix_Gavia(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;
    case 176:
      textMessage1 = "הניחושים נקלטו. שיהיה בהצלחה";
      break;
    case 177:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 178:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      teamUp_ToFix_Num = parseInt(req.body.query.message.split(" ")[5]);
      teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
      minute_toFix = req.body.query.message.split(" ")[7];

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      footballFunc.saveFix_Gavia(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;
    case 179:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 180:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
    case 183:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      teamUp_ToFix_Num = parseInt(req.body.query.message.split(" ")[5]);
      teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
      minute_toFix = req.body.query.message.split(" ")[7];

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      footballFunc.saveFix_Gavia(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix
      );

      textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;
    case 184:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 185:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
    case 186:
      gameNum = req.body.query.message.split(" ")[1];
      score1 = req.body.query.message.split(" ")[3].split(":")[1];
      score2 = req.body.query.message.split(" ")[3].split(":")[0];
      teamUp_ToFix_Num = parseInt(req.body.query.message.split(" ")[5]);
      teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
      minute_toFix = req.body.query.message.split(" ")[7];

      console.log(
        "answer",
        score1,
        score2,
        gameNum,
        teamUp_ToFix,
        minute_toFix
      );

      await footballFunc.saveFix_Gavia(
        parseInt(gameNum),
        parseInt(score1),
        parseInt(score2),
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix
      );

      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      // textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
      // textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
      break;
    case 187:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
    case 188:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 189:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
    case 190:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
    case 191:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        false,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
      break;
    case 192:
      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData_Gavia,
        cycleIndexNum
      );

      // ----------End fix auto----------------
      GuessData_Saved = await footballFunc.getSavedGuss_Gavia(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "גביע המדינה",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);
      textMessage = await footballFunc.chooseGameToFix_Gavia(
        GuessData_Saved,
        true,
        cycleNum
      );
      console.log(textMessage);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];
      textMessage3 = textMessage[2];

      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { GviaHamedina };
