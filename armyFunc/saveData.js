const { google } = require("googleapis");
const moment = require("moment");

const saveData = async function (
  sheetTitle,
  columnLetter1,
  data,
  append,
  phoneNumber
) {
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

  if (append) {
    try {
      Range_Cell = sheetTitle + "!" + "A2:" + columnLetter1;

      const res_save = googleSheetsInstance.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: Range_Cell,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [[phoneNumber, data]],
        },
      });
      console.log("save");
      return res_save;
    } catch (e) {
      console.log("not save", e);
      return "not save";
    }
  } else {
    try {
      const rowIndex = getRowNumber(
        googleSheetsInstance,
        spreadsheetId,
        sheetTitle,
        phoneNumber
      );
      console.log("idx", rowIndex);

      Range_Cell = sheetTitle + "!" + columnLetter1;

      const res_save = googleSheetsInstance.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: Range_Cell,
        valueInputOption: "USER_ENTERED",
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
  }
};

const getRowNumber = async (sheets, spreadsheetId, sheetTitle, phoneNumber) => {
  try {
    const range = `${sheetTitle}!A:B`; // Adjust the range based on your needs

    // Make the API request to get the values
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values;

    // Search for the specific value in your desired column
    const targetValue = phoneNumber;
    let rowNumber = null;

    if (values) {
      for (let i = 0; i < values.length; i++) {
        const row = values[i];
        if (row.length >= 2 && row[1] === targetValue) {
          // Adjust column index (0-based) according to your needs
          rowNumber = i + 1;
          break;
        }
      }
    }

    console.log("Row number:", rowNumber);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

module.exports = { saveData };
