const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment"); // require

// const autoIncrement = require("mongoose-auto-increment");

const { footballFunc } = require("./footballFunc");

const { models } = require("./models");
const { mongoFunc } = require("./mongoFunc");
const dotenv = require("dotenv");
const server = http.createServer(app);

const schedule = require("node-schedule");

dotenv.config();
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "Client/build")));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

let Mongo_Path = process.env.Mongo_Path;

function connectToDB() {
  // const connection = mongoose.connect("mongodb://localhost/Shop", {

  const connection = mongoose.connect(Mongo_Path, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  // autoIncrement.initialize(connection);
  // ProductSchema.plugin(autoIncrement.plugin, "Product");

  return connection;
}

let cycleNum = "0";
let cycleText = "";
let cycleDate = "";
let Games = [];
let GamesList = [];
let cycleIndexNum = 0;
let UsersIndex = [];
let GuessData = [];
GuessData_Gavia = [];
let UsersList = [];
let gameNum = 0;
let score1 = 0;
let score2 = 0;
let isFirst = true;
let teamUp_ToFix = "";
let minute_toFix = "";
let teamUp_ToFix_Num = "";

const getData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  const res_cycle = await footballFunc.getCycle(Data);
  cycleNum = res_cycle[0];
  cycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  cycleDate = cycleDate2.replace("-", ".");
  console.log("cycleDate", cycleDate, cycleDate.replace("-", "."));
  cycleIndexNum = res_cycle[2];

  Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
  for (let g = 0; g < Games.length; g++) {
    console.log("Games", Games[g]._rawData[0], cycleNum);
    if (Games[g]._rawData[0] === cycleNum) {
      const team_1 = Games[g]._rawData[1];
      const team_2 = Games[g]._rawData[2];
      GamesList.push([team_1, team_2]);
    }
  }
  console.log("GamesList", cycleNum, GamesList);
  UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים");
  for (let l = 0; l < UsersIndex.length; l++) {
    UsersList.push(UsersIndex[l]._rawData[0]);
  }
  GuessData = await footballFunc.getDataFromSheet("ליגת העל");
  GuessData_Gavia = await footballFunc.getDataFromSheet("גביע המדינה");
  // console.log("GuessData_Gavia", GuessData_Gavia);
  // console.log(UsersIndex);
  console.log(moment().format());
};

const job = schedule.scheduleJob("0 0 4 * * *", getData);

getData();

app.post("/api/Whatsapp", async (req, res) => {
  console.log("whatsapp okk", req.body);
  // const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  // const res_cycle = await footballFunc.getCycle(Data);
  // const cycleNum = res_cycle[0];
  // const cycleDate = moment(res_cycle[1]).format("DD-MM-YYYY");
  const user_name = req.body.query.sender;
  console.log("u", user_name);
  console.log("cycleNum", cycleNum, cycleDate);
  const stage = req.body.query.ruleId;
  console.log(stage);
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  // let Games = [];
  let Team1 = "";
  let Team2 = "";
  // let GamesList = [];
  let score = "";
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let ChoiseUp = "";
  let ChoiseUpteam = "";
  let ChoiseMinut = "";
  let Minuts = "";
  let GuessData_Saved = [];
  let textMessage = "";
  // let GuessData = [];
  switch (stage) {
    case 109:
      console.log("UsersList", UsersList);
      if (!UsersList.includes(user_name)) {
        console.log("not includs");
        textMessage1 =
          "אהלן, אני הבוט של *היציע: ליגת העל*" +
          // moment().year() +
          "\nאינך רשאי להשתמש בבוט. ";
        break;
      }

      for (let l = 0; l < UsersIndex.length; l++) {
        if (user_name === UsersIndex[l]._rawData[0]) {
          const first = UsersIndex[l]._rawData[2];
          if (first === "1") {
            isFirst = false;
          }
        }
      }

      if (isFirst) {
        UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים");
        for (let l = 0; l < UsersIndex.length; l++) {
          if (user_name === UsersIndex[l]._rawData[0]) {
            const first = UsersIndex[l]._rawData[2];
            if (first === "1") {
              isFirst = false;
            }
          }
        }
      }
      if (isFirst) {
        textMessage1 =
          "היי, נעים מאוד אני הבוט של *היציע: ליגת העל.*" +
          // moment().year() +
          "\nמה ברצונכם לעשות?";
        textMessage2 =
          "\n 1️⃣ לניחוש תוצאות משחקי ליגת העל \n2️⃣ לניחוש תוצאות משחקי גביע המדינה";
      } else {
        textMessage1 = "מה קורה נשמות? שמח שחזרתם!" + "\nמה ברצונכם לעשות?";
        textMessage2 =
          "\n 1️⃣ לניחוש תוצאות משחקי ליגת העל \n2️⃣ לניחוש תוצאות משחקי גביע המדינה";
      }

      break;
    case 110:
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
            "שומעים רגע? הדד ליין לשליחת הניחושים למחזור *" +
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
    case 111:
      if (cycleNum !== "0" && cycleText.includes("גביע המדינה")) {
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים לשלב *" +
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
    case 113:
      textMessage1 =
        "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
        "*" +
        cycleDate +
        "*" +
        " בחצות. יאללה ביי! 😎 ";
      break;
    case 114:
      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];

      const str9 = "*" + cycleNum + ", משחק מספר 1:* ";
      textMessage1 = str9 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "מי הקבוצה שתעלה לשלב שמינית הגמר?";
      textMessage3 = "\n1️⃣ " + Team1 + "\n2️⃣ " + Team2;

      score = req.body.query.message;
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

      // footballFunc.saveData_Full(
      //   user_name,
      //   UsersIndex,
      //   GuessData_Gavia,
      //   cycleIndexNum,
      //   "גביע המדינה",
      //   "F",
      //   "G",
      //   ScoreTeam1,
      //   ScoreTeam2
      // );

      break;
    case 117:
      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];

      const str10 = "*" + cycleNum + ", משחק מספר 1:* ";
      textMessage1 = str10 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      if (GamesList.length < 2) {
        await footballFunc.saveData_Full(
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
          GuessData,
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

        footballFunc.saveData_Full(
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str13 = "*" + cycleNum + ", משחק מספר 2:* ";
      textMessage1 = str13 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }
      if (GamesList.length < 3) {
        await footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

        footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str16 = "*" + cycleNum + ", משחק מספר 3:* ";
      textMessage1 = str16 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str19 = "*" + cycleNum + ", משחק מספר 4:* ";
      textMessage1 = str19 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }
      if (GamesList.length < 5) {
        await footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

        footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str22 = "*" + cycleNum + ", משחק מספר 5:* ";
      textMessage1 = str22 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str58 = "*" + cycleNum + ", משחק מספר 6:* ";
      textMessage1 = str58 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str61 = "*" + cycleNum + ", משחק מספר 7:* ";
      textMessage1 = str61 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str25 = "*" + cycleNum + ", משחק מספר 8:* ";
      textMessage1 = str25 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }
      if (GamesList.length < 9) {
        await footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

        footballFunc.saveData_Full(
          user_name,
          UsersIndex,
          GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str28 = "*" + cycleNum + ", משחק מספר 9:* ";
      textMessage1 = str28 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str31 = "*" + cycleNum + ", משחק מספר 10:* ";
      textMessage1 = str31 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str34 = "*" + cycleNum + ", משחק מספר 11:* ";
      textMessage1 = str34 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str37 = "*" + cycleNum + ", משחק מספר 12:* ";
      textMessage1 = str37 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str40 = "*" + cycleNum + ", משחק מספר 13:* ";
      textMessage1 = str40 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str43 = "*" + cycleNum + ", משחק מספר 14:* ";
      textMessage1 = str43 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str46 = "*" + cycleNum + ", משחק מספר 15:* ";
      textMessage1 = str46 + "\n" + Team1 + " - " + Team2;
      textMessage2 = "איך יסתיים המשחק?";
      textMessage3 = "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[1];
      ScoreTeam2 = score.split(":")[0];
      console.log("ScoreTeam1", ScoreTeam1);
      console.log("ScoreTeam2", ScoreTeam2);

      footballFunc.saveData_Full(
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

      const str49 = "*" + cycleNum + ", משחק מספר 16:* ";
      textMessage1 = str49 + "\n" + Team1 + " - " + Team2;
      textMessage2 =
        "איך יסתיים המשחק?" + "\n1️⃣ 90 דקות \n2️⃣ 120 דקות \n3️⃣ פנדלים";
      textMessage3 =
        "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה דקות לעבד את הנתונים ולהציג את ניחושי השלב המלאים ששלחתם. במידה ולא קיבלתם ממני סיכום של הניחושים לאחר 5 דקות, אנא שילחו שוב את הניחוש לשאלה האחרונה.";

      ChoiseUp = req.body.query.message;
      if (parseInt(ChoiseUp) === 1) {
        ChoiseUpteam = Team1;
      } else {
        ChoiseUpteam = Team2;
      }

      footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
      if (parseInt(ChoiseMinut) === 1) {
        Minuts = "90 דקות";
      } else if (parseInt(ChoiseMinut) === 2) {
        Minuts = "120 דקות";
      } else {
        Minuts = "פנדלים";
      }

      await footballFunc.saveData_Full(
        user_name,
        UsersIndex,
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
        cycleIndexNum,
        teamUp_ToFix,
        minute_toFix
      );

      // ----------Start fix auto----------------
      await footballFunc.fixAuto_Main(
        GamesList,
        user_name,
        UsersIndex,
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
        GuessData,
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
          "שומעים רגע? הדד ליין לשליחת הניחושים ל*מחזור ה*-" +
          "*" +
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

      footballFunc.saveData_Full(
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

      footballFunc.saveData_Full(
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

      footballFunc.saveData_Full(
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

      footballFunc.saveData_Full(
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

      footballFunc.saveData_Full(
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

      footballFunc.saveData_Full(
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

      await footballFunc.saveData_Full(
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

      const resSaveIdx = await footballFunc.saveData_Full(
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

    default:
      console.log(`Sorry, we are out of range.`);
  }
  const jsonFile =
    textMessage3 !== "empty"
      ? {
          replies: [
            {
              message: textMessage1,
            },
            {
              message: textMessage2,
            },
            {
              message: textMessage3,
            },
          ],
        }
      : textMessage2 !== "empty"
      ? {
          replies: [
            {
              message: textMessage1,
            },
            {
              message: textMessage2,
            },
          ],
        }
      : {
          replies: [
            {
              message: textMessage1,
            },
          ],
        };
  // const jsonFile = {

  //   replies: [
  //     {
  //       message: textMessage1,
  //     },
  //     {
  //       message: textMessage2,
  //     },
  //   ],
  // };
  res.send(jsonFile);
});

app.get("*", (req, res) => {
  console.log(req.body);
  res.send("non rout");
  //   res.sendFile(path.join(__dirname + "/Client/build/index.html"));
});

// connectToDB().then(() => {
server.listen(port, () => {
  console.log("Example app listening on port " + port);
  //   });
});
