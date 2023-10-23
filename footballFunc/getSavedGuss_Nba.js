const { GoogleSpreadsheet } = require("google-spreadsheet");

const getSavedGuss_Nba = async function ({
  user_name,
  UsersIndex,
  cycleIndexNum,
  sheetTitle,
  GamesList,
  fileName,
}) {
  console.log({ fileName });
  console.log("GamesList", GamesList);
  const creds = require("../config/CreditTransaction-d9fe1ef7e128.json");
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1n00YD7sTIKT_PEJJp_z4KqDNLxyjr92R6NOVsggNMe0"
  );

  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByTitle[sheetTitle];
    if (sheet) {
      let index = null;
      console.log("user_name", user_name);
      for (let u = 0; u < UsersIndex.length; u++) {
        if (user_name === UsersIndex[u]._rawData[0]) {
          index = UsersIndex[u]._rawData[1];
        }
      }
      const GuessData = await sheet.getRows();
      console.log("parseInt", parseInt(cycleIndexNum));
      console.log("index", parseInt(index));
      console.log(GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]);
      if (
        GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
        user_name
      ) {
        const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
        console.log("idxss", raw_idx);
        const SavedGuess = GuessData[raw_idx]._rawData;
        console.log("SavedGuess", SavedGuess);
        // let Arr = [];
        // let score1 = 0;
        // let score2 = 0;
        // let teamUp = "";
        // let scoresObj = {};
        // for (let g = 0; g < GamesList.length; g++) {
        //   console.log("g", g);
        //   const Team1 = GamesList[g][0];
        //   const Team2 = GamesList[g][1];
        //   switch (g) {
        //     case 0:
        //       score1 = SavedGuess[5];
        //       score2 = SavedGuess[6];
        //       teamUp = SavedGuess[7];
        //       minute = fileName === "Mondial" ? SavedGuess[8] : SavedGuess[7];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       //   console.log(Arr);
        //       break;
        //     case 1:
        //       score1 = SavedGuess[21];
        //       score2 = SavedGuess[22];
        //       teamUp = SavedGuess[23];
        //       minute = fileName === "Mondial" ? SavedGuess[24] : SavedGuess[23];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 2:
        //       score1 = SavedGuess[37];
        //       score2 = SavedGuess[38];
        //       teamUp = SavedGuess[39];
        //       minute = fileName === "Mondial" ? SavedGuess[40] : SavedGuess[39];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 3:
        //       score1 = SavedGuess[53];
        //       score2 = SavedGuess[54];
        //       teamUp = SavedGuess[55];
        //       minute = fileName === "Mondial" ? SavedGuess[56] : SavedGuess[55];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 4:
        //       score1 = SavedGuess[69];
        //       score2 = SavedGuess[70];
        //       teamUp = SavedGuess[71];
        //       minute = fileName === "Mondial" ? SavedGuess[72] : SavedGuess[71];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 5:
        //       score1 = SavedGuess[85];
        //       score2 = SavedGuess[86];
        //       teamUp = SavedGuess[87];
        //       minute = SavedGuess[88];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 6:
        //       score1 = SavedGuess[101];
        //       score2 = SavedGuess[102];
        //       teamUp = SavedGuess[103];
        //       minute = SavedGuess[104];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 7:
        //       score1 = SavedGuess[117];
        //       score2 = SavedGuess[118];
        //       teamUp = SavedGuess[119];
        //       minute = SavedGuess[120];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 8:
        //       score1 = SavedGuess[133];
        //       score2 = SavedGuess[134];
        //       teamUp = SavedGuess[135];
        //       minute = SavedGuess[136];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 9:
        //       score1 = SavedGuess[149];
        //       score2 = SavedGuess[150];
        //       teamUp = SavedGuess[151];
        //       minute = SavedGuess[152];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;
        //     case 10:
        //       score1 = SavedGuess[165];
        //       score2 = SavedGuess[166];
        //       teamUp = SavedGuess[167];
        //       minute = SavedGuess[168];
        //       scoresObj = {
        //         team1: [Team1, score1],
        //         team2: [Team2, score2],
        //         teamUp: teamUp,
        //         minute: minute,
        //       };
        //       Arr.push(scoresObj);
        //       break;

        //   }
        // }
        // console.log(Arr);
        // return Arr;
      } else {
        console.log("not find saved guess");
        return "not find saved guess";
      }
    } else {
      return "err";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { getSavedGuss_Nba };
