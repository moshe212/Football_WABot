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

app.post("/api/Whatsapp", async (req, res) => {
  console.log("whatsapp okk", req.body);
  const Data = await footballFunc.getDataFromSheet("תאריכי מחזורים");
  const cycleNum = await footballFunc.getCycle(Data);
  const Games = await footballFunc.getDataFromSheet("רשימת משחקים לפי מחזור");
  const GamesList = [];
  for (let g = 0; g < Games.length; g++) {
    console.log(
      Games[g]._rawData[0],
      Games[g]._rawData[1],
      Games[g]._rawData[2]
    );

    if (Games[g]._rawData[0] === cycleNum) {
      const team1 = Games[g]._rawData[1];
      const team2 = Games[g]._rawData[2];
      GamesList.push([team1, team2]);
    }
  }
  console.log(GamesList);
  // const cycle = cycleNum
  console.log("cycleNum", cycleNum);
  const cycle = "5.2021";
  // const jsonFile = {
  //   reply:
  //     " אהלן, אני הבוט של היציע: ליגת העל 2021 האם ברצונכם למלא את ניחושי המחזור " +
  //     cycle +
  //     "?" +
  //     "\n  כן - הקש 1 \n לא - הקש 2",
  // };
  const stage = req.body.query.ruleId;
  console.log(stage);
  const cycledate = "17.08.2021";
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  switch (stage) {
    case 4:
      textMessage1 =
        " אהלן, אני הבוט של היציע: ליגת העל 2021 האם ברצונכם למלא את ניחושי המחזור " +
        cycle +
        "?";
      textMessage2 = "\n  כן - הקש 1 \n לא - הקש 2";
      break;
    case 9:
      textMessage1 =
        "בוט: אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
        cycledate +
        ". יאללה ביי! 😎 ";
      break;
    case 12:
      textMessage1 =
        "בוט: החלטתם לשגע אותי היום? לכו תעשו שיעורי בית ותחזרו למלא את הניחושים כשתהיו מוכנים, ולא יאוחר " +
        cycledate +
        " 😎";

      break;
    case 11:
      textMessage1 =
        "בוט: מחזור  " + cycle + ", משחק מספר 1: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 21:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 2: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 22:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 3: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 23:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 4: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 24:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 5: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 25:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 6: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;
    case 26:
      textMessage1 =
        "בוט: מחזור <מספר מחזור>, משחק מספר 7: <קבוצה א׳> נגד <קבוצה ב׳>.";

      break;

    default:
      console.log(`Sorry, we are out of range.`);
  }
  const jsonFile = {
    replies: [
      {
        message: textMessage1,
      },
      {
        message: textMessage2,
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

// connectToDB().then(() => {
server.listen(port, () => {
  console.log("Example app listening on port " + port);
  //   });
});
