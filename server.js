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
const getData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  const res_cycle = await footballFunc.getCycle(Data);
  cycleNum = res_cycle[0];
  cycleDate = moment(res_cycle[1]).format("DD-MM-YYYY");
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
};

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
  // let GuessData = [];
  switch (stage) {
    case 4:
      console.log("UsersList", UsersList);
      if (!UsersList.includes(user_name)) {
        console.log("not includs");
        textMessage1 =
          " אהלן, אני הבוט של היציע: ליגת העל " +
          moment().year() +
          "\n אינך רשאי להשתמש בבוט. ";
        break;
      }
      if (cycleNum !== 0) {
        textMessage1 =
          " אהלן, אני הבוט של היציע: ליגת העל  " +
          moment().year() +
          " האם ברצונכם למלא את ניחושי המחזור " +
          cycleNum +
          "?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;
      } else {
        textMessage1 = " אהלן, אני הבוט של היציע: ליגת העל " + moment().year();
        textMessage2 =
          "אנחנו נמצאים באמצע מחזור לכן לא ניתן לשלוח ניחושים כרגע, ניתן לחזור לשלוח ניחושים בתאריך" +
          cycleDate;
        break;
      }

    case 9:
      textMessage1 =
        " אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
        cycleDate +
        ". יאללה ביי! 😎 ";
      break;
    case 12:
      textMessage1 =
        "החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים, ולא יאוחר " +
        cycleDate +
        " 😎";

      break;
    case 11:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");

      console.log(GamesList);
      Team1 = GamesList[0][0];
      Team2 = GamesList[0][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 1: " + Team1 + " נגד " + Team2;

      break;
    case 21:
      console.log(GamesList);
      Team1 = GamesList[1][0];
      Team2 = GamesList[1][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 2: " + Team1 + " נגד " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];

      await footballFunc.saveData_Full(
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

      // // GuessData = await footballFunc.getDataFromSheet("ליגת העל");
      // let index = null;
      // console.log("user_name", user_name);
      // for (let u = 0; u < UsersIndex.length; u++) {
      //   // console.log(
      //   //   "user_name",
      //   //   user_name,
      //   //   UsersIndex[u]._rawData[0],
      //   //   UsersIndex[u]._rawData[1]
      //   // );
      //   if (user_name === UsersIndex[u]._rawData[0]) {
      //     index = UsersIndex[u]._rawData[1];
      //   }
      // }
      // console.log(
      //   "cycleIndexNum",
      //   cycleIndexNum,
      //   parseInt(cycleIndexNum) + parseInt(index)
      // );
      // console.log(
      //   "GuessData_name",
      //   GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1]
      // );

      // if (
      //   GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
      //   user_name
      // ) {
      //   const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
      //   const resp_save = await footballFunc.saveData(
      //     "ליגת העל",
      //     raw_idx,
      //     3,
      //     "D",
      //     "E",
      //     ScoreTeam1,
      //     ScoreTeam2
      //   );
      //   console.log("resp_save", resp_save);
      // } else {
      //   console.log("not save");
      // }
      break;
    case 22:
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 3: " + Team1 + " נגד " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveData_Full(
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
    case 23:
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 4: " + Team1 + " נגד " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveData_Full(
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
    case 24:
      console.log(GamesList);
      Team1 = GamesList[4][0];
      Team2 = GamesList[4][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 5: " + Team1 + " נגד " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveData_Full(
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
    case 25:
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 6: " + Team1 + " נגד " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveData_Full(
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
    case 26:
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 7: " + Team1 + " נגד " + Team2;
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

      await footballFunc.saveData_Full(
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

    case 41:
      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
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

      const GuessData_Saved = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved", GuessData_Saved);

      textMessage1 =
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

      textMessage2 = "\n 1️⃣ לאישור \n2️⃣ לשינוי או תיקון";

      break;

    case 45:
      const GuessData_Saved2 = await footballFunc.getSavedScore(
        user_name,
        UsersIndex,
        cycleIndexNum,
        "ליגת העל",
        GamesList
      );
      console.log("GuessData_Saved2", GuessData_Saved2);

      textMessage1 =
        "איזה תוצאות תרצו לשנות או לתקן?  " +
        "\n  1️⃣" +
        GuessData_Saved2[0].team1[0] +
        " - " +
        GuessData_Saved2[0].team2[0] +
        ":" +
        GuessData_Saved2[0].team1[1] +
        ":" +
        GuessData_Saved2[0].team2[1] +
        "\n  2️⃣" +
        GuessData_Saved2[1].team1[0] +
        " - " +
        GuessData_Saved2[1].team2[0] +
        ":" +
        GuessData_Saved2[1].team1[1] +
        ":" +
        GuessData_Saved2[1].team2[1] +
        "\n  3️⃣" +
        GuessData_Saved2[2].team1[0] +
        " - " +
        GuessData_Saved2[2].team2[0] +
        ":" +
        GuessData_Saved2[2].team1[1] +
        ":" +
        GuessData_Saved2[2].team2[1] +
        "\n  4️⃣" +
        GuessData_Saved2[3].team1[0] +
        " - " +
        GuessData_Saved2[3].team2[0] +
        ":" +
        GuessData_Saved2[3].team1[1] +
        ":" +
        GuessData_Saved2[3].team2[1] +
        "\n  5️⃣" +
        GuessData_Saved2[4].team1[0] +
        " - " +
        GuessData_Saved2[4].team2[0] +
        ":" +
        GuessData_Saved2[4].team1[1] +
        ":" +
        GuessData_Saved2[4].team2[1] +
        "\n  6️⃣" +
        GuessData_Saved2[5].team1[0] +
        " - " +
        GuessData_Saved2[5].team2[0] +
        ":" +
        GuessData_Saved2[5].team1[1] +
        ":" +
        GuessData_Saved2[5].team2[1] +
        "\n  7️⃣" +
        GuessData_Saved2[6].team1[0] +
        " - " +
        GuessData_Saved2[6].team2[0] +
        ":" +
        GuessData_Saved2[6].team1[1] +
        ":" +
        GuessData_Saved2[6].team2[1] +
        "\n נא להשיב במבנה הבא: ";

      textMessage2 = "משחק 1 תוצאה 1:2";

      break;

    case 80:
      const gameNum = req.body.query.message.split(" ")[1];
      const score1 = req.body.query.message.split(" ")[3][0];
      const score2 = req.body.query.message.split(" ")[3][1];
      console.log("answer", score1, score2, gameNum);

      textMessage1 = "answer";

      // switch (gameNum) {
      //   case 1:
      //     console.log(GamesList);
      //     Team1 = GamesList[0][0];
      //     Team2 = GamesList[0][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 1: " + Team1 + " נגד " + Team2;

      //     break;
      //   case 2:
      //     console.log(GamesList);
      //     Team1 = GamesList[1][0];
      //     Team2 = GamesList[1][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 2: " + Team1 + " נגד " + Team2;

      //     break;

      //   case 3:
      //     console.log(GamesList);
      //     Team1 = GamesList[2][0];
      //     Team2 = GamesList[2][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 3: " + Team1 + " נגד " + Team2;

      //     break;

      //   case 4:
      //     console.log(GamesList);
      //     Team1 = GamesList[3][0];
      //     Team2 = GamesList[3][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 4: " + Team1 + " נגד " + Team2;

      //     break;

      //   case 5:
      //     console.log(GamesList);
      //     Team1 = GamesList[4][0];
      //     Team2 = GamesList[4][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 5: " + Team1 + " נגד " + Team2;

      //     break;

      //   case 6:
      //     console.log(GamesList);
      //     Team1 = GamesList[5][0];
      //     Team2 = GamesList[5][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 6: " + Team1 + " נגד " + Team2;

      //     break;

      //   case 7:
      //     console.log(GamesList);
      //     Team1 = GamesList[6][0];
      //     Team2 = GamesList[6][1];
      //     textMessage1 =
      //       "מחזור  " + cycleNum + " משחק מספר 7: " + Team1 + " נגד " + Team2;

      //     break;
      // }
      break;

    // case 59:
    //   score = req.body.query.message;
    //   ScoreTeam1 = score.split(":")[0];
    //   ScoreTeam2 = score.split(":")[1];
    //   // GuessData = await footballFunc.getDataFromSheet("ליגת העל");

    //   await footballFunc.saveData_Full(
    //     user_name,
    //     UsersIndex,
    //     GuessData,
    //     cycleIndexNum,
    //     "ליגת העל",
    //     "BL",
    //     "BM",
    //     ScoreTeam1,
    //     ScoreTeam2
    //   );

    default:
      console.log(`Sorry, we are out of range.`);
  }
  const jsonFile =
    textMessage2 !== "empty"
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
