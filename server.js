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
const { botRollsFunctions } = require("./botRollsFunctions");

// const tablemark = require("tablemark");
const removeMarkdown = require("markdown-to-text");
const json2md = require("json2md");
// const markdownTable = require("markdown-table-cjs");

// console.log(
//   json2md([
//     { h1: "JSON To Markdown" },
//     { blockquote: "A JSON to Markdown converter." },
//     {
//       img: [
//         { title: "Some image", source: "https://example.com/some-image.png" },
//         {
//           title: "Another image",
//           source: "https://example.com/some-image1.png",
//         },
//         {
//           title: "Yet another image",
//           source: "https://example.com/some-image2.png",
//         },
//       ],
//     },
//     { h2: "Features" },
//     {
//       ul: [
//         "Easy to use",
//         "You can programmatically generate Markdown content",
//         "...",
//       ],
//     },
//     { h2: "How to contribute" },
//     { ol: ["Fork the project", "Create your branch", "Raise a pull request"] },
//     { h2: "Code blocks" },
//     { p: "Below you can see a code block example." },
//     {
//       code: {
//         language: "js",
//         content: ["function sum (a, b) {", "   return a + b", "}", "sum(1, 2)"],
//       },
//     },
//   ])
// );

// const tableMdString = json2md([
//   { name: "Bob", age: 21, isCool: false },
//   { name: "Sarah", age: 22, isCool: true },
//   { name: "Lee", age: 23, isCool: true },
// ]);
// console.log(tableMdString);
// const text = removeMarkdown(tableMdString);
// consol.log({ text });

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
  // console.log("cycleDate", cycleDate, cycleDate.replace("-", "."));
  cycleIndexNum = res_cycle[2];

  Games = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "LigatAl"
  );
  for (let g = 0; g < Games.length; g++) {
    // console.log("Games", Games[g]._rawData[0], cycleNum);
    if (Games[g]._rawData[0] === cycleNum) {
      // console.log("Games[g]", Games[g]);
      const team_1 = Games[g]._rawData[1];
      const team_2 = Games[g]._rawData[2];
      GamesList.push([team_1, team_2]);
    }
  }
  // console.log("GamesList", cycleNum, GamesList);
  UsersIndex = await footballFunc.getDataFromSheet("אינדקס משתמשים", "LigatAl");
  for (let l = 0; l < UsersIndex.length; l++) {
    UsersList.push(UsersIndex[l]._rawData[0]);
  }
  GuessData = await footballFunc.getDataFromSheet("ליגת העל", "LigatAl");
  // GuessData_Gavia = await footballFunc.getDataFromSheet(
  //   "גביע המדינה",
  //   "LigatAl"
  // );
  // console.log({ GuessData_Gavia });
  AchievementsOfSeasonData = await footballFunc.getDataFromSheet(
    "הישגים",
    "LigatAl"
  );
  tablesData = await footballFunc.getTablesData();

  for (let i = 0; i < tablesData.length; i++) {
    tableObj = { ...tableObj, ...tablesData[i] };
  }
  // console.log(tableObj.clalitTable);
  // console.log(tableObj.roundOne);
  // console.log({ tablesData });
  // console.log(tablesData.clalitTable);
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
  console.log({ res_cycle });
  alufotCycleNum = res_cycle[0];
  alufotCycleText = res_cycle[3];
  const cycleDate1 = moment(res_cycle[1]).format("DD-MM-YYYY");
  const cycleDate2 = cycleDate1.replace("-", ".");
  alufotCycleDate = cycleDate2.replace("-", ".");
  // console.log("cycleDate", cycleDate, cycleDate.replace("-", "."));
  alufotCycleIndexNum = res_cycle[2];

  alufotGames = await footballFunc.getDataFromSheet(
    "רשימת משחקים לפי מחזור",
    "Alufot"
  );
  for (let g = 0; g < alufotGames.length; g++) {
    // console.log("Games", Games[g]._rawData[0], cycleNum);
    if (alufotGames[g]._rawData[0] === alufotCycleNum) {
      // console.log("Games[g]", Games[g]);
      const team_1 = alufotGames[g]._rawData[1];
      const team_2 = alufotGames[g]._rawData[2];
      alufotGamesList.push([team_1, team_2]);
    }
  }
  // console.log("GamesList", cycleNum, GamesList);
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
  // console.log({ GuessData_ShlavHanokout });
  console.log({ alufotGuessData });
  // alufotAchievementsOfSeasonData = await footballFunc.getDataFromSheet(
  //   "הישגים",
  //   "Alufot"
  // );
  // alufotTablesData = await footballFunc.getTablesData();

  // for (let i = 0; i < alufotTablesData.length; i++) {
  //   alufotTableObj = { ...alufotTableObj, ...alufotTablesData[i] };
  // }
  // console.log(alufotTableObj.clalitTable);
  // console.log(alufotTableObj.roundOne);
  // console.log({ tablesData });
  // console.log(tablesData.clalitTable);

  // console.log({ alufotGames });
};

const job1 = schedule.scheduleJob("0 0 4 * * *", getData);
const job2 = schedule.scheduleJob("0 0 4 * * *", getAlufotData);

getData();
getAlufotData();

app.post("/api/Whatsapp", async (req, res) => {
  const user_name = req.body.query.sender;
  console.log("username", user_name);
  console.log("cycleNum", cycleNum, cycleDate);
  console.log(
    "alufotCycleNum",
    alufotCycleNum,
    alufotCycleDate,
    alufotCycleText
  );
  const stage = req.body.query.ruleId;
  console.log(stage);

  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  const score = req.body.query.message;
  const gameNum = req.body.query.message.split(" ")
    ? req.body.query.message.split(" ")[1]
    : "";
  const score1 = req.body.query.message.split(" ")[3]
    ? req.body.query.message.split(" ")[3].split(":")[1]
    : "";
  const score2 = req.body.query.message.split(" ")[3]
    ? req.body.query.message.split(" ")[3].split(":")[0]
    : "";

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
    });

    textMessage1 = LigatAlMessages[0];
    textMessage2 = LigatAlMessages[1];
    textMessage3 = LigatAlMessages[2];
  } else if (stage === 256 || (stage > 295 && stage < 413)) {
    const LigatAlufotMessages = await botRollsFunctions.LigatAlufot(
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
      GuessData_ShlavHanokout
    );

    textMessage1 = LigatAlufotMessages[0];
    textMessage2 = LigatAlufotMessages[1];
    textMessage3 = LigatAlufotMessages[2];
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
