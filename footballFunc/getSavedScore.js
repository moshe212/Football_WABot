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
        for (let g = 0; g < GamesList.length; g++) {
          const Team1 = GamesList[g][0];
          const Team2 = GamesList[g][1];
          switch (g) {
            case 0:
              const score1 = SavedGuess[3];
              const score2 = SavedGuess[4];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 1:
              const score1 = SavedGuess[15];
              const score2 = SavedGuess[16];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 2:
              const score1 = SavedGuess[27];
              const score2 = SavedGuess[28];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 3:
              const score1 = SavedGuess[39];
              const score2 = SavedGuess[40];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 4:
              const score1 = SavedGuess[51];
              const score2 = SavedGuess[52];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 5:
              const score1 = SavedGuess[63];
              const score2 = SavedGuess[64];
              const scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
              };
              Arr.push(scoresObj);

            case 6:
              const score1 = SavedGuess[75];
              const score2 = SavedGuess[76];
              const scoresObj = {
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
