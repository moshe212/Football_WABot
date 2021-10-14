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

let cycleNum = 0;
let cycleDate = "";
let Games = [];
let GamesList = [];
let cycleIndexNum = 0;
let UsersIndex = [];
let GuessData = [];
let UsersList = [];
let gameNum = 0;
let score1 = 0;
let score2 = 0;
let isFirst = true;

const getData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  const res_cycle = await footballFunc.getCycle(Data);
  cycleNum = res_cycle[0];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  cycleDate = cycleDate2.replace("-", ".");
  console.log("cycleDate", cycleDate, cycleDate.replace("-", "."));
  cycleIndexNum = res_cycle[2];

  Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
  for (let g = 0; g < Games.length; g++) {
    if (Games[g]._rawData[0] === cycleNum) {
      const team_1 = Games[g]._rawData[1];
      const team_2 = Games[g]._rawData[2];
      GamesList.push([team_1, team_2]);
    }
  }

  UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים");
  for (let l = 0; l < UsersIndex.length; l++) {
    UsersList.push(UsersIndex[l]._rawData[0]);
  }
  GuessData = await footballFunc.getDataFromSheet("ליגת העל");
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
  let GuessData_Saved = [];
  let textMessage = "";
  // let GuessData = [];
  switch (stage) {
    case 33:
      console.log("UsersList", UsersList);
      if (!UsersList.includes(user_name)) {
        console.log("not includs");
        textMessage1 =
          " אהלן, אני הבוט של *היציע: ליגת העל* " +
          moment().year() +
          "\n אינך רשאי להשתמש בבוט. ";
        break;
      }
      if (cycleNum !== 0) {
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
            " היי, אני הבוט של *היציע: ליגת העל.*  " +
            // moment().year() +
            "\n האם ברצונכם למלא את ניחושי המחזור ה " +
            cycleNum +
            "?";
          textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        } else {
          textMessage1 =
            "היי, איזה כיף שחזרתם!" +
            "\n האם ברצונכם לנחש את תוצאות משחקי המחזור ה-" +
            cycleNum +
            "?";
          textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        }

        break;
      } else {
        textMessage1 = " אהלן, אני הבוט של היציע: ליגת העל " + moment().year();
        textMessage2 =
          "אנחנו נמצאים באמצע מחזור לכן לא ניתן לשלוח ניחושים כרגע, ניתן לחזור לשלוח ניחושים בתאריך" +
          cycleDate;
        break;
      }

    case 35:
      textMessage1 =
        "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה- " +
        "*" +
        cycleDate +
        "*" +
        " יאללה ביי! 😎 ";
      break;
    case 38:
      textMessage1 =
        "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים.שימו לב שאתם עושים זאת לא יאוחר מה- " +
        "*" +
        cycleDate +
        "*" +
        " 😎";

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
        "*שימו לב:* אחרי שתנחשו את תוצאת המשחק האחרונה, ייקח לי כמה שניות לעבד את הנתונים ולהציג את ניחושי המחזור המלאים ששלחתם.";
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
      console.log("textMessage", textMessage);
      console.log("textMessage1", textMessage[0]);
      console.log("textMessage2", textMessage[1]);
      textMessage1 = textMessage[0];
      textMessage2 = textMessage[1];

      footballFunc.saveData_Full(
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
      textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\n ניפגש במחזור הבא.";

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
