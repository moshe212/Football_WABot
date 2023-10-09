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

    const res_save = await googleSheetsInstance.spreadsheets.values.update({
      auth, //auth object
      spreadsheetId, //spreadsheet id
      range: Range_Cell, //"Sheet1!A:B" sheet name and range of cells
      valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
      insertDataOption: "INSERT_ROWS",
      //   valueInputOption: 'RAW',
      resource: {
        values: [[data]],
      },
    });
    console.log("save");
    return res_save;
  } catch (e) {
    console.log("not save");
    return "not save";
    throw e;
  }
};

module.exports = { saveData };
