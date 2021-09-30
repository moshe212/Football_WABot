const { GoogleSpreadsheet } = require("google-spreadsheet");

const getSavedScore = async function (
  user_name,
  UsersIndex,
  cycleIndexNum,
  sheetTitle
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
        const SavedGuess = GuessData[raw_idx];

        return SavedGuess;
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
