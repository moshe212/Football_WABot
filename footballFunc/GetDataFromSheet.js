const { GoogleSpreadsheet } = require("google-spreadsheet");
const moment = require("moment"); // require

const GetDataFromSheet = async function () {
  const creds = require("../config/CreditTransaction-d9fe1ef7e128.json");
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(
    "1J3iFj9uM3TEC3y__u02PFnq5M5YKSezXP6TVYOEGMto"
  );

  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // loads document properties and worksheets

    const docTitle = doc.title;
    console.log("for");
    return docTitle;
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

module.exports = { GetDataFromSheet };
