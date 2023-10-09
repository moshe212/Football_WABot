const { google } = require("googleapis");
const moment = require("moment");

const saveData = async function (sheetTitle, columnLetter1, data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "config/CreditTransaction-d9fe1ef7e128.json", //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  //Auth client Object
  const authClientObject = await auth.getClient();
  //Google sheets instance
  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });
  const spreadsheetId = "1EVIxduo5Yh8F4rXEKBxfHLHkPkE4A4a4XpHPD3jWyWc";

  let Range_Cell = "";
  try {
    Range_Cell = sheetTitle + "!" + columnLetter1;

    const res_save = googleSheetsInstance.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: Range_Cell,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      //   valueInputOption: 'RAW',
      resource: {
        values: [[data]],
      },
    });
    console.log("save");
    return res_save;
  } catch (e) {
    console.log("not save", e);
    return "not save";
  }
};

module.exports = { saveData };
