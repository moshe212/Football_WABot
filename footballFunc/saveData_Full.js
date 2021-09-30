const { GoogleSpreadsheet } = require("google-spreadsheet");

const saveData_Full = async function (
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  sheetTitle,
  columnLetter1,
  columnLetter2,
  score1,
  score2
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

      if (
        GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
        user_name
      ) {
        const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
        console.log("idxs", raw_idx);
        //   await sheet.loadCells("A1:CP" + rawindex);
        await sheet.loadCells("A" + raw_idx + ":CP" + (raw_idx + 2));
        const cell_team1 = sheet.getCellByA1(columnLetter1 + (raw_idx + 2));
        const cell_team2 = sheet.getCellByA1(columnLetter2 + (raw_idx + 2));
        cell_team1.value = score1;
        cell_team2.value = score2;

        const res_save = await sheet.saveUpdatedCells();

        return res_save;
      } else {
        console.log("not save");
        return "not save";
      }
    } else {
      return "err";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { saveData_Full };
