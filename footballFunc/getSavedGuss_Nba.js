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
  if (!user_name || !UsersIndex) {
    return "err";
  }
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

        const SavedGuess = GuessData[raw_idx]._rawData;

        let Arr = [];

        for (let g = 0; g < GamesList.length; g++) {
          const Team1 = GamesList[g][0];
          const Team2 = GamesList[g][1];

          let baseNum = 3;
          const Location = SavedGuess[baseNum];
          const Difference = SavedGuess[baseNum + 2];
          const Under_Over = SavedGuess[baseNum + 4];

          const gameDetialsObj = {
            Team1,
            Team2,
            Location,
            Difference,
            Under_Over,
          };
          Arr.push(gameDetialsObj);
          baseNum = baseNum + 6;
        }
        console.log(Arr);
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

module.exports = { getSavedGuss_Nba };
