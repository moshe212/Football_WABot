const { GoogleSpreadsheet } = require("google-spreadsheet");

const getSavedGuss_Gavia = async function (
  user_name,
  UsersIndex,
  cycleIndexNum,
  sheetTitle,
  GamesList
) {
  const creds = require("../config/CreditTransaction-d9fe1ef7e128.json");
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1J3iFj9uM3TEC3y__u02PFnq5M5YKSezXP6TVYOEGMto"
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
      if (
        GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
        user_name
      ) {
        const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
        console.log("idxss", raw_idx);
        const SavedGuess = GuessData[raw_idx]._rawData;
        let Arr = [];
        let score1 = 0;
        let score2 = 0;
        let teamUp = "";
        let scoresObj = {};
        for (let g = 0; g < GamesList.length; g++) {
          console.log("g", g);
          const Team1 = GamesList[g][0];
          const Team2 = GamesList[g][1];
          switch (g) {
            case 0:
              score1 = SavedGuess[4];
              score2 = SavedGuess[3];
              teamUp = SavedGuess[5];
              minute = SavedGuess[6];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              //   console.log(Arr);
              break;
            case 1:
              score1 = SavedGuess[16];
              score2 = SavedGuess[15];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
            case 2:
              score1 = SavedGuess[28];
              score2 = SavedGuess[27];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
            case 3:
              score1 = SavedGuess[40];
              score2 = SavedGuess[39];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
            case 4:
              score1 = SavedGuess[52];
              score2 = SavedGuess[51];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
            case 5:
              score1 = SavedGuess[64];
              score2 = SavedGuess[63];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
            case 6:
              score1 = SavedGuess[76];
              score2 = SavedGuess[75];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
              break;
          }
        }
        // console.log(Arr);
        return Arr;
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

module.exports = { getSavedGuss_Gavia };
