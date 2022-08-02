const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const server = http.createServer(app);
const schedule = require("node-schedule");
const moment = require("moment");

const { footballFunc } = require("./footballFunc");
const { botRollsFunctions } = require("./botRollsFunctions");

dotenv.config();
app.use(bodyParser.json());

app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
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
      console.log("Games[g]", Games[g]);
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
};

const job = schedule.scheduleJob("0 0 4 * * *", getData);

getData();

app.post("/api/Whatsapp", async (req, res) => {
  const user_name = req.body.query.sender;
  console.log("username", user_name);
  console.log("cycleNum", cycleNum, cycleDate);
  const stage = req.body.query.ruleId;
  console.log(stage);
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  const score = req.body.query.message;
  const gameNum = req.body.query.message.split(" ")[1];
  const score1 = req.body.query.message.split(" ")[3].split(":")[1];
  const score2 = req.body.query.message.split(" ")[3].split(":")[0];

  if (stage === 109 || stage === 113 || stage === 253) {
    const firstMessages = await botRollsFunctions.FirstSort({
      stage,
      UsersList,
      user_name,
      UsersIndex,
      cycleDate,
    });

    textMessage1 = firstMessages[0];
    textMessage2 = firstMessages[1];
    textMessage3 = firstMessages[2];
  } else if ((stage > 113 && stage < 193) || stage === 111 || stage === 112) {
    const GaviaMessages = await botRollsFunctions.GviaHamedina({
      cycleNum,
      GamesList,
      cycleIndexNum,
      UsersIndex,
      GuessData,
      GuessData_Gavia,
      user_name,
      stage,
      score,
      gameNum,
      score1,
      score2,
    });

    textMessage1 = GaviaMessages[0];
    textMessage2 = GaviaMessages[1];
    textMessage3 = GaviaMessages[2];
  } else if (
    (stage > 32 && stage < 100) ||
    stage === 110 ||
    (stage > 248 && stage < 253)
  ) {
    const LigatAlMessages = await botRollsFunctions.LigatAl({
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
    });

    textMessage1 = LigatAlMessages[0];
    textMessage2 = LigatAlMessages[1];
    textMessage3 = LigatAlMessages[2];
  } else {
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

  res.send(jsonFile);
});

app.get("*", (req, res) => {
  console.log(req.body);
  res.send("non rout");
  //   res.sendFile(path.join(__dirname + "/Client/build/index.html"));
});

server.listen(port, () => {
  console.log("Example app listening on port " + port);
});
