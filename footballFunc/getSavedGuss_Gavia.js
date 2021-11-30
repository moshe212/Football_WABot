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
              score1 = SavedGuess[6];
              score2 = SavedGuess[5];
              teamUp = SavedGuess[7];
              minute = SavedGuess[8];
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
              score1 = SavedGuess[22];
              score2 = SavedGuess[21];
              teamUp = SavedGuess[23];
              minute = SavedGuess[24];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 2:
              score1 = SavedGuess[38];
              score2 = SavedGuess[37];
              teamUp = SavedGuess[39];
              minute = SavedGuess[40];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 3:
              score1 = SavedGuess[54];
              score2 = SavedGuess[53];
              teamUp = SavedGuess[55];
              minute = SavedGuess[56];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 4:
              score1 = SavedGuess[70];
              score2 = SavedGuess[69];
              teamUp = SavedGuess[71];
              minute = SavedGuess[72];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 5:
              score1 = SavedGuess[86];
              score2 = SavedGuess[85];
              teamUp = SavedGuess[87];
              minute = SavedGuess[88];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 6:
              score1 = SavedGuess[102];
              score2 = SavedGuess[101];
              teamUp = SavedGuess[103];
              minute = SavedGuess[104];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 7:
              score1 = SavedGuess[118];
              score2 = SavedGuess[117];
              teamUp = SavedGuess[119];
              minute = SavedGuess[120];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 8:
              score1 = SavedGuess[134];
              score2 = SavedGuess[133];
              teamUp = SavedGuess[135];
              minute = SavedGuess[136];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 9:
              score1 = SavedGuess[150];
              score2 = SavedGuess[149];
              teamUp = SavedGuess[151];
              minute = SavedGuess[152];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 10:
              score1 = SavedGuess[166];
              score2 = SavedGuess[165];
              teamUp = SavedGuess[167];
              minute = SavedGuess[168];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 11:
              score1 = SavedGuess[182];
              score2 = SavedGuess[181];
              teamUp = SavedGuess[183];
              minute = SavedGuess[184];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 12:
              score1 = SavedGuess[198];
              score2 = SavedGuess[197];
              teamUp = SavedGuess[199];
              minute = SavedGuess[200];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 13:
              score1 = SavedGuess[214];
              score2 = SavedGuess[213];
              teamUp = SavedGuess[215];
              minute = SavedGuess[216];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 14:
              score1 = SavedGuess[230];
              score2 = SavedGuess[229];
              teamUp = SavedGuess[231];
              minute = SavedGuess[232];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
              };
              Arr.push(scoresObj);
              break;
            case 15:
              score1 = SavedGuess[246];
              score2 = SavedGuess[245];
              teamUp = SavedGuess[247];
              minute = SavedGuess[248];
              scoresObj = {
                team1: [Team1, score1],
                team2: [Team2, score2],
                teamUp: teamUp,
                minute: minute,
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
