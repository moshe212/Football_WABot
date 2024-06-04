// import http from "http";
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import schedule from "node-schedule";
// import moment from "moment";

const http = require("http");
const https = require("https");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const schedule = require("node-schedule");
const moment = require("moment");
const app = express();
const server = http.createServer(app);

const { footballFunc } = require("./footballFunc");
const { basicFunc } = require("./basicFunc");
const { botRollsFunctions } = require("./botRollsFunctions");
const { armyFunc } = require("./armyFunc");
const { footballDataFunc } = require("./footballDataFunc");

const { exec } = require("child_process");
const scheduleRestartServer = require("./serverRestart");

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
let AchievementsOfSeasonData = [];
let tablesData = [];
let tableObj = {};
const getData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "LigatAl");
  const res_cycle = await footballFunc.getCycle(Data);
  cycleNum = res_cycle[0];
  cycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  cycleDate = cycleDate2.replace("-", ".");

  cycleIndexNum = res_cycle[2];

  Games = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "LigatAl"
  );
  for (let g = 0; g < Games.length; g++) {
    if (Games[g]._rawData[0] === cycleNum) {
      const team_1 = Games[g]._rawData[1];
      const team_2 = Games[g]._rawData[2];
      GamesList.push([team_1, team_2]);
    }
  }

  UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים", "LigatAl");
  for (let l = 0; l < UsersIndex.length; l++) {
    UsersList.push(UsersIndex[l]._rawData[0]);
  }
  GuessData = await footballFunc.getDataFromSheet("ליגת העל", "LigatAl");
  // GuessData_Gavia = await footballFunc.getDataFromSheet(
  //   "גביע המדינה",
  //   "LigatAl"
  // );

  // AchievementsOfSeasonData = await footballFunc.getDataFromSheet(
  //   "הישגים",
  //   "LigatAl"
  // );
  // tablesData = await footballFunc.getTablesData();

  // for (let i = 0; i < tablesData.length; i++) {
  //   tableObj = { ...tableObj, ...tablesData[i] };
  // }
};

let alufotCycleNum = "0";
let alufotCycleText = "";
let alufotCycleDate = "";
let alufotGames = [];
let alufotGamesList = [];
let alufotCycleIndexNum = 0;
let alufotUsersIndex = [];
let alufotGuessData = [];
let alufotUsersList = [];
let alufotAchievementsOfSeasonData = [];
let alufotTablesData = [];
let alufotTableObj = {};
const getAlufotData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "Alufot");
  const res_cycle = await footballFunc.getCycle(Data);
  alufotCycleNum = res_cycle[0];
  alufotCycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  alufotCycleDate = cycleDate2.replace("-", ".");

  alufotCycleIndexNum = res_cycle[2];

  alufotGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Alufot"
  );
  for (let g = 0; g < alufotGames.length; g++) {
    // console.log("alufotGames[g]._rawData[0]", alufotGames[g]._rawData[0]);
    console.log("alufotCycleNum", alufotCycleNum);
    if (alufotGames[g]._rawData[0] === alufotCycleNum) {
      const team_1 = alufotGames[g]._rawData[1];
      const team_2 = alufotGames[g]._rawData[2];
      alufotGamesList.push([team_1, team_2]);
    }
  }

  alufotUsersIndex = await footballFunc.getDataFromSheet(
    "אינדקס משתמשים",
    "Alufot"
  );
  for (let l = 0; l < alufotUsersIndex.length; l++) {
    alufotUsersList.push(alufotUsersIndex[l]._rawData[0]);
  }
  alufotGuessData = await footballFunc.getDataFromSheet("שלב הבתים", "Alufot");
  GuessData_ShlavHanokout = await footballFunc.getDataFromSheet(
    "שלב הנוקאאוט",
    "Alufot"
  );

  // alufotAchievementsOfSeasonData = await footballFunc.getDataFromSheet(
  //   "הישגים",
  //   "Alufot"
  // );
  // alufotTablesData = await footballFunc.getTablesData();

  // for (let i = 0; i < alufotTablesData.length; i++) {
  //   alufotTableObj = { ...alufotTableObj, ...alufotTablesData[i] };
  // }
};

let mondialCycleNum = "0";
let mondialCycleText = "";
let mondialCycleDate = "";
let mondialGames = [];
let mondialGamesList = [];
let mondialCycleIndexNum = 0;
let mondialUsersIndex = [];
let mondialGuessData = [];
let mondialGuessData_ShlavHanokout = [];
let mondialUsersList = [];
let mondialAchievementsOfSeasonData = [];
let mondialTablesData = [];
let mondialTableObj = {};
const getMondialData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "Mondial");
  const res_cycle = await footballFunc.getCycle(Data);
  mondialCycleNum = res_cycle[0];
  mondialCycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  mondialCycleDate = cycleDate2.replace("-", ".");

  mondialCycleIndexNum = res_cycle[2];

  mondialGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Mondial"
  );
  for (let g = 0; g < mondialGames.length; g++) {
    if (mondialGames[g]._rawData[0] === mondialCycleNum) {
      const team_1 = mondialGames[g]._rawData[1];
      const team_2 = mondialGames[g]._rawData[2];
      mondialGamesList.push([team_1, team_2]);
    }
  }

  mondialUsersIndex = await footballFunc.getDataFromSheet(
    "אינדקס משתמשים",
    "Mondial"
  );
  for (let l = 0; l < mondialUsersIndex.length; l++) {
    mondialUsersList.push(mondialUsersIndex[l]._rawData[0]);
  }
  mondialGuessData = await footballFunc.getDataFromSheet(
    "שלב הבתים",
    "Mondial"
  );
  mondialGuessData_ShlavHanokout = await footballFunc.getDataFromSheet(
    "שלב הנוקאאוט",
    "Mondial"
  );

  // mondialAchievementsOfSeasonData = await footballFunc.getDataFromSheet(
  //   "הישגים",
  //   "Alufot"
  // );
  // mondialTablesData = await footballFunc.getTablesData();

  // for (let i = 0; i < mondialTablesData.length; i++) {
  //   mondialTableObj = { ...mondialTableObj, ...mondialTablesData[i] };
  // }
};

let olamiCycleNum = "0";
let olamiCycleText = "";
let olamiCycleDate = "";
let olamiGames = [];
let olamiGamesList = [];
let olamiCycleIndexNum = 0;
let olamiUsersIndex = [];
let olamiGuessData = [];
let olamiGuessData_ShlavHanokout = [];
let olamiUsersList = [];
let olamiAchievementsOfSeasonData = [];
let olamiTablesData = [];
let olamiTableObj = {};
const getOlamiData = async () => {
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים", "Olami");
  const res_cycle = await footballFunc.getCycle(Data);
  console.log("res_cycle_olami", res_cycle);
  olamiCycleNum = res_cycle[0];
  olamiCycleText = res_cycle[3];
  console.log("olamiCycleText", olamiCycleText);
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  olamiCycleDate = cycleDate2.replace("-", ".");

  olamiCycleIndexNum = res_cycle[2];

  olamiGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Olami"
  );
  for (let g = 0; g < olamiGames.length; g++) {
    if (olamiGames[g]._rawData[0] === olamiCycleNum) {
      const team_1 = olamiGames[g]._rawData[1];
      const team_2 = olamiGames[g]._rawData[2];
      const text1 = olamiGames[g]._rawData[4];
      const text2 = olamiGames[g]._rawData[5];
      const text3 = olamiGames[g]._rawData[6];
      olamiGamesList.push([team_1, team_2, text1, text2, text3]);
    }
  }

  olamiUsersIndex = await footballFunc.getDataFromSheet(
    "אינדקס משתמשים",
    "Olami"
  );
  for (let l = 0; l < olamiUsersIndex.length; l++) {
    olamiUsersList.push(olamiUsersIndex[l]._rawData[0]);
  }
  olamiGuessData = await footballFunc.getDataFromSheet("הניחושים", "Olami");
  olamiGuessData_ShlavHanokout = await footballFunc.getDataFromSheet(
    "שלב הנוקאאוט",
    "Olami"
  );
  console.log({ olamiUsersList });
  // olamiAchievementsOfSeasonData = await footballFunc.getDataFromSheet(
  //   "הישגים",
  //   "Alufot"
  // );
  // olamiTablesData = await footballFunc.getTablesData();

  // for (let i = 0; i < olamiTablesData.length; i++) {
  //   olamiTableObj = { ...olamiTableObj, ...olamiTablesData[i] };
  // }
};
const job1 = schedule.scheduleJob("0 0 4 * * *", getData);
const job2 = schedule.scheduleJob("0 0 4 * * *", getAlufotData);
const job3 = schedule.scheduleJob("0 0 4 * * *", getMondialData);
const job4 = schedule.scheduleJob("0 0 4 * * *", getOlamiData);

// const startServer = () => {
//   console.log("Restarting...");

//   const restartCommand = "npm run start";
//   // Execute the restart command
//   exec(restartCommand, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error restarting server: ${error.message}`);
//     } else {
//       console.log("Server restarted successfully");
//       console.log(`stdout: ${stdout}`);
//       console.log(`stderr: ${stderr}`);
//     }
//   });
// };

// const reStart = () => {
//   exec("killall node", (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error killing server process: ${error.message}`);
//     } else {
//       console.log("Server process killed successfully");
//       console.log(`stdout: ${stdout}`);
//       console.log(`stderr: ${stderr}`);

//       // Restart the server immediately after killing it
//       startServer();
//     }
//   });
// };

// const job1 = schedule.scheduleJob("55 10 * * *", reStart);

getData();
getAlufotData();
getMondialData();
getOlamiData();

//-------------------------------------
const getAllData = async () => {
  // await getData();
  // await getAlufotData();
  // await getMondialData();
  // await getOlamiData();
  const nbaData = await footballDataFunc.getNBAData();
  const euroData = await footballDataFunc.getEuroData();

  return { euroData };
};
let allData;

getAllData().then((data) => {
  // console.log(data);
  allData = data;
  // console.log("test", test);
});

app.post("/api/Adalo", async (_req, res) => {
  console.log("Adalo");
  console.log("req", _req.body);
  res.status(200).end();
});

app.post("/api/Rotem_hr_WaBot", async (_req, res) => {
  console.log("WaBot");
  const user_name = _req.body.query.sender;
  const message = _req.body.query.message;

  console.log(`msg: ${message}`);

  const words = message.split(" ");
  const lastWord = words[words.length - 1];
  console.log(lastWord);
  let textMsg = "";
  if (/^[0-9]+$/.allData(lastWord)) {
    console.log("The string contains only numbers");

    const resShortURL = await basicFunc.getShortURL({ id: Number(lastWord) });
    console.log("resShortURL", resShortURL);
    const shortURL = resShortURL.shortURL;
    console.log("short", shortURL);
    const url = `http://192.117.146.232:3000/QestionForm?misraID=${Number(
      lastWord
    )}`;
    textMsg =
      "היי בשביל להפוך את הלינק ללחיץ ניתן לשמור אותנו כאנשי קשר 🙂" +
      "\nלהלן הלינק לשאלון לרישום למשרה:" +
      `\n ${shortURL}`;
  } else {
    console.log("The string contains other characters besides numbers");

    textMsg =
      "היי אני הבוט של *רותם השמה*, אשמח ללוות אתכם עד מציאת עבודה.. 😎" +
      "\nאנא ציין את מספר המשרה עליה תרצה לקבל מידע בסוף ההודעה.." +
      "\nלדוגמא :אשמח לקבל פרטים על משרה מס' 57486";
  }
  try {
    const jsonFile = {
      replies: [
        {
          message: textMsg,
        },
      ],
    };

    res.send(jsonFile);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

app.post("/api/Army_WaBot", async (_req, res) => {
  console.log("Army_WaBot", _req.body.query);

  const phoneNumber = _req.body.query.sender;
  const message = _req.body.query.message;
  const stage = _req.body.query.ruleId;
  console.log(stage);

  console.log(`msg: ${message}`);
  console.log(
    "phon",
    phoneNumber
      .replace(" ", "")
      .replace(" ", "")
      .replace(" ", "")
      .replace("+", "")
  );
  const textMsgs = await armyFunc.getAnswer(
    stage,
    message,
    phoneNumber
      .replace(" ", "")
      .replace(" ", "")
      .replace(" ", "")
      .replace("+", "")
  );
  try {
    if (textMsgs.length > 1) {
      const jsonFile = {
        replies: [
          {
            message: textMsgs[0],
          },
          {
            message: textMsgs[1],
          },
        ],
      };
      res.send(jsonFile);
    } else {
      const jsonFile = {
        replies: [
          {
            message: textMsgs[0],
          },
        ],
      };
      res.send(jsonFile);
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
});

app.post("/api/Test", async (req, res) => {
  const {
    euroCycleNum,
    euroCycleText,
    euroCycleDate,
    euroGames,
    euroGamesList,
    euroCycleIndexNum,
    euroUsersIndex,
    euroGuessData,
    euroUsersList,
    euroGuessData_ShlavHanokout,
  } = allData?.euroData;

  const saved = await footballFunc.getSavedScore(
    "משה אנסבכר",
    euroUsersIndex,
    "5",
    "שלב הבתים",
    euroGamesList,
    "Euro"
  );

  res.send(saved);
});

app.post("/api/Whatsapp", async (req, res) => {
  const user_name = req.body.query.sender;
  console.log("username", user_name);
  console.log("cycleNum", cycleNum, cycleDate);
  console.log("olamiCycleNum", olamiCycleNum, olamiCycleDate, olamiCycleText);
  // console.log("mondialCycleNum", mondialCycleNum);
  // console.log("mondialGamesList", mondialGamesList);
  console.log("route", allData);
  const {
    nbaCycleNum,
    nbaCycleText,
    nbaCycleDate,
    nbaGames,
    nbaGamesList,
    nbaCycleIndexNum,
    nbaUsersIndex,
    nbaGuessData,
    nbaUsersList,
  } = allData?.nbaData;

  const {
    euroCycleNum,
    euroCycleText,
    euroCycleDate,
    euroGames,
    euroGamesList,
    euroCycleIndexNum,
    euroUsersIndex,
    euroGuessData,
    euroUsersList,
    euroGuessData_ShlavHanokout,
  } = allData?.euroData;

  const stage = req.body.query.ruleId;
  console.log(stage);

  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  const score = req.body.query.message;
  const message = req.body.query.message;
  const gameNum = req.body.query.message.split(" ")
    ? req.body.query.message.split(" ")[1]
    : "";
  const score1 = req.body.query.message.split(" ")[3]
    ? req.body.query.message.split(" ")[3].split(":")[1]
    : "";
  const score2 = req.body.query.message.split(" ")[3]
    ? req.body.query.message.split(" ")[3].split(":")[0]
    : "";

  if (stage === 109) {
    textMessage1 =
      "היי, נעים מאוד אני הבוט של *היציע. מוזמנים לקרוא לי בוטי.*" +
      // moment().year() +
      "\nמה ברצונכם לעשות?";
    textMessage2 =
      "\n1️⃣ - למשחק *היציע: ליגת העל*" +
      "\n2️⃣ - למשחק *היציע: NBA*" +
      "\n3️⃣ - למשחק *היציע: אולימפיאדה*" +
      "\n4️⃣ - למשחק *היציע: מונדיאל*" +
      "\n5️⃣ - למשחק *היציע: כדורגל עולמי*" +
      "\n6️⃣ - למשחק *היציע: כדורגל יורו*";

    // +"\n5️⃣ - למשחק *היציע: יורו* \n6️⃣ - למשחק *היציע: בחירות* \n7️⃣ - למשחק *היציע: אולימפיאדה*";
  } else if (stage === 113) {
    textMessage1 =
      "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
      "*" +
      cycleDate +
      "*" +
      " בחצות. יאללה ביי! 😎 ";
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
    (stage > 248 && stage < 253) ||
    (stage > 266 && stage < 293)
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
      AchievementsOfSeasonData,
      tableObj,
      UsersList,
    });

    textMessage1 = LigatAlMessages[0];
    textMessage2 = LigatAlMessages[1];
    textMessage3 = LigatAlMessages[2];
  } else if (
    stage === 256 ||
    (stage > 295 && stage < 476) ||
    (stage > 665 && stage < 695)
  ) {
    const LigatAlufotMessages = await botRollsFunctions.LigatAlufot(
      message,
      alufotCycleNum,
      alufotCycleText,
      alufotCycleDate,
      alufotGamesList,
      alufotCycleIndexNum,
      alufotUsersIndex,
      alufotGuessData,
      user_name,
      stage,
      score,
      gameNum,
      score1,
      score2,
      alufotAchievementsOfSeasonData,
      alufotTableObj,
      GuessData_ShlavHanokout,
      alufotUsersList
    );

    textMessage1 = LigatAlufotMessages[0];
    textMessage2 = LigatAlufotMessages[1];
    textMessage3 = LigatAlufotMessages[2];
  } else if (stage === 257 || (stage > 478 && stage < 665)) {
    const MondialMessages = await botRollsFunctions.Mondial(
      message,
      mondialCycleNum,
      mondialCycleText,
      mondialCycleDate,
      mondialGamesList,
      mondialCycleIndexNum,
      mondialUsersIndex,
      mondialGuessData,
      user_name,
      stage,
      score,
      gameNum,
      score1,
      score2,
      mondialAchievementsOfSeasonData,
      mondialTableObj,
      mondialGuessData_ShlavHanokout,
      mondialUsersList
    );

    textMessage1 = MondialMessages[0];
    textMessage2 = MondialMessages[1];
    textMessage3 = MondialMessages[2];
  } else if (
    (stage > 700 && stage < 800) ||
    stage === 700 ||
    (stage > 248 && stage < 253) ||
    (stage > 266 && stage < 293)
  ) {
    const OlamiMessages = await botRollsFunctions.Olami(
      olamiCycleNum,
      olamiCycleText,
      olamiCycleDate,
      olamiGamesList,
      olamiCycleIndexNum,
      olamiUsersIndex,
      olamiGuessData,
      user_name,
      stage,
      score,
      gameNum,
      score1,
      score2,
      olamiAchievementsOfSeasonData,
      olamiTableObj,
      olamiUsersList
    );

    textMessage1 = OlamiMessages[0];
    textMessage2 = OlamiMessages[1];
    textMessage3 = OlamiMessages[2];
  } else if (stage === 255 || (stage > 800 && stage < 996)) {
    console.log("NBAMessages", nbaUsersList);
    const NBAMessages = await botRollsFunctions.Nba({
      message,
      cycleDate: nbaCycleDate,
      cycleText: nbaCycleText,
      cycleNum: nbaCycleNum,
      GamesList: nbaGamesList,
      cycleIndexNum: nbaCycleIndexNum,
      UsersIndex: nbaUsersIndex,
      GuessData: nbaGuessData,
      user_name,
      stage,
      score,
      UsersList: nbaUsersList,
    });

    textMessage1 = NBAMessages[0];
    textMessage2 = NBAMessages[1];
    textMessage3 = NBAMessages[2];
  } else if (stage === 258 || stage > 995) {
    console.log("Euro", euroUsersList);
    const EuroMessages = await botRollsFunctions.Euro(
      message,
      euroCycleNum,
      euroCycleText,
      euroCycleDate,
      euroGamesList,
      euroCycleIndexNum,
      euroUsersIndex,
      euroGuessData,
      user_name,
      stage,
      score,
      gameNum,
      score1,
      score2,
      euroGuessData_ShlavHanokout,
      euroUsersList
    );

    textMessage1 = EuroMessages[0];
    textMessage2 = EuroMessages[1];
    textMessage3 = EuroMessages[2];
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
