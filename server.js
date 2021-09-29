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
};

getData();

app.post("/api/Whatsapp", async (req, res) => {
  console.log("whatsapp okk", req.body);
  // const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  // const res_cycle = await footballFunc.getCycle(Data);
  // const cycleNum = res_cycle[0];
  // const cycleDate = moment(res_cycle[1]).format("DD-MM-YYYY");
  const user_name = req.query.sender;

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
  let GuessData = [];
  switch (stage) {
    case 4:
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
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      // GamesList = [];
      // for (let g = 0; g < Games.length; g++) {
      //   if (Games[g]._rawData[0] === cycleNum) {
      //     const team_1 = Games[g]._rawData[1];
      //     const team_2 = Games[g]._rawData[2];
      //     GamesList.push([team_1, team_2]);
      //   }
      // }
      console.log(GamesList);
      Team1 = GamesList[1][0];
      Team2 = GamesList[1][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 2: " + Team1 + " נגד " + Team2;

      score = req.body.query.message;
      ScoreTeam1 = score.split(":")[0];
      ScoreTeam2 = score.split(":")[1];
      GuessData = await footballFunc.getDataFromSheet("ליגת העל");
      console.lg("cycleIndexNum", cycleIndexNum);
      break;
    case 22:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      GamesList = [];
      for (let g = 0; g < Games.length; g++) {
        if (Games[g]._rawData[0] === cycleNum) {
          const team_1 = Games[g]._rawData[1];
          const team_2 = Games[g]._rawData[2];
          GamesList.push([team_1, team_2]);
        }
      }
      console.log(GamesList);
      Team1 = GamesList[2][0];
      Team2 = GamesList[2][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 3: " + Team1 + " נגד " + Team2;

      break;
    case 23:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      GamesList = [];
      for (let g = 0; g < Games.length; g++) {
        if (Games[g]._rawData[0] === cycleNum) {
          const team_1 = Games[g]._rawData[1];
          const team_2 = Games[g]._rawData[2];
          GamesList.push([team_1, team_2]);
        }
      }
      console.log(GamesList);
      Team1 = GamesList[3][0];
      Team2 = GamesList[3][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 4: " + Team1 + " נגד " + Team2;

      break;
    case 24:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      GamesList = [];
      for (let g = 0; g < Games.length; g++) {
        if (Games[g]._rawData[0] === cycleNum) {
          const team_1 = Games[g]._rawData[1];
          const team_2 = Games[g]._rawData[2];
          GamesList.push([team_1, team_2]);
        }
      }
      console.log(GamesList);
      Team1 = GamesList[4][0];
      Team2 = GamesList[4][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 5: " + Team1 + " נגד " + Team2;

      break;
    case 25:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      GamesList = [];
      for (let g = 0; g < Games.length; g++) {
        if (Games[g]._rawData[0] === cycleNum) {
          const team_1 = Games[g]._rawData[1];
          const team_2 = Games[g]._rawData[2];
          GamesList.push([team_1, team_2]);
        }
      }
      console.log(GamesList);
      Team1 = GamesList[5][0];
      Team2 = GamesList[5][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 6: " + Team1 + " נגד " + Team2;

      break;
    case 26:
      // Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
      GamesList = [];
      for (let g = 0; g < Games.length; g++) {
        if (Games[g]._rawData[0] === cycleNum) {
          const team_1 = Games[g]._rawData[1];
          const team_2 = Games[g]._rawData[2];
          GamesList.push([team_1, team_2]);
        }
      }
      console.log(GamesList);
      Team1 = GamesList[6][0];
      Team2 = GamesList[6][1];
      textMessage1 =
        "מחזור  " + cycleNum + " משחק מספר 7: " + Team1 + " נגד " + Team2;

      break;

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
