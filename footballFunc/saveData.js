const { GoogleSpreadsheet } = require("google-spreadsheet");

const saveData = async function (
  sheetTitle,
  rawindex,
  columnindex,
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
      const cells = await sheet.loadCells("A1:CP2800");
      const cell_team1 = sheet.getCell(rawindex, columnindex);
      const cell_team2 = sheet.getCell(rawindex, columnindex + 1);
      cell_team1.value = score1;
      cell_team2.value = score2;
      const res_save = await sheet.saveUpdatedCells();

      return res_save;
    }
  } catch (e) {
    throw e;
  }

  //   console.log(doc.title);
  //   await doc.updateProperties({ title: "renamed doc" });
  // const promises = [];
  // for (let i = 0; i < BankNames.length; i++) {
  //   const sheet = doc.sheetsByTitle[BankNames[i]]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  //   if (sheet) {
  //     const rows = await sheet.getRows(); // can pass in { limit, offset }
  //   }
  // }
};

module.exports = { saveData };
