const { GoogleSpreadsheet } = require("google-spreadsheet");

const getSavedScore = async function (
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
        let score1 = "";
        let score2 = "";
        let scoresObj = {};
        for (let g = 0; g < GamesList.length; g++) {
          const Team1 = GamesList[g][0];
          const Team2 = GamesList[g][1];
          switch (g) {
            case 0:
              score1 = SavedGuess[3];
              score2 = SavedGuess[4];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 1:
              score1 = SavedGuess[15];
              score2 = SavedGuess[16];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 2:
              score1 = SavedGuess[27];
              score2 = SavedGuess[28];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 3:
              score1 = SavedGuess[39];
              score2 = SavedGuess[40];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 4:
              score1 = SavedGuess[51];
              score2 = SavedGuess[52];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 5:
              score1 = SavedGuess[63];
              score2 = SavedGuess[64];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 6:
              score1 = SavedGuess[75];
              score2 = SavedGuess[76];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);
          }
        }

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

module.exports = { getSavedScore };
