const { GoogleSpreadsheet } = require("google-spreadsheet");

const saveData = async function (
  sheetTitle,
  rawindex,
  columnindex,
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
      console.log("idxs", rawindex, columnindex);
      //   await sheet.loadCells("A1:CP" + rawindex);
      await sheet.loadCells("A" + rawindex + ":CP" + (rawindex + 2));
      const cell_team1 = sheet.getCellByA1(columnLetter1 + (rawindex + 2));
      const cell_team2 = sheet.getCellByA1(columnLetter2 + (rawindex + 2));
      cell_team1.value = score1;
      cell_team2.value = score2;

      //   const cell_team1 = sheet.getCell(rawindex, columnindex);
      //   const cell_team2 = sheet.getCell(rawindex, columnindex + 1);
      //   cell_team1.value = score1;
      //   cell_team2.value = score2;
      const res_save = await sheet.saveUpdatedCells();

      return res_save;
    } else {
      return "err";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { saveData };
