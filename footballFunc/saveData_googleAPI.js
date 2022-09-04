const { google } = require("googleapis");
const moment = require("moment");

const saveData_googleAPI = async function (
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  sheetTitle,
  columnLetter1,
  columnLetter2,
  score1,
  score2,
  IsFirst,
  Team,
  fileName
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
  const spreadsheetId =
    fileName === "LigatAl"
      ? "1J3iFj9uM3TEC3y__u02PFnq5M5YKSezXP6TVYOEGMto"
      : fileName === "Alufot"
      ? "1a8XbSk7anY4S0SvyJawCqrYYcae4WUN3C-NUO7_K-ys"
      : "";
  let Range_Cell = "";
  try {
    let index = null;
    console.log("user_name_g", user_name);
    for (let u = 0; u < UsersIndex.length; u++) {
      if (user_name === UsersIndex[u]._rawData[0]) {
        index = UsersIndex[u]._rawData[1];
        console.log(IsFirst);
        if (IsFirst) {
          console.log("first", IsFirst);
          UsersIndex[u].is_first_time = 1;
          UsersIndex[u].last_gusses = moment().format();
          await UsersIndex[u].save();
          return "save first";
        }
      }
    }
    console.log("0", cycleIndexNum, index);
    console.log("1", parseInt(cycleIndexNum), parseInt(index) - 2);
    console.log("2", GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]);
    if (
      GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
      user_name
    ) {
      const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
      console.log("idxs_g", raw_idx);
      //   await sheet.loadCells("A1:CP" + rawindex);
      if (!Team) {
        Range_Cell =
          sheetTitle +
          "!" +
          columnLetter1 +
          (raw_idx + 2) +
          ":" +
          columnLetter2 +
          (raw_idx + 2);
        console.log("Range_Cell", Range_Cell);
        //write data into the google sheets
        const res_save = await googleSheetsInstance.spreadsheets.values.update({
          auth, //auth object
          spreadsheetId, //spreadsheet id
          range: Range_Cell, //"Sheet1!A:B" sheet name and range of cells
          valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
          resource: {
            values: [[score1, score2]],
          },
        });

        console.log("save");
        return res_save;
      } else {
        Range_Cell =
          sheetTitle +
          "!" +
          columnLetter1 +
          (raw_idx + 2) +
          ":" +
          columnLetter1;
        console.log("Team", Team);
        console.log("Range_Cell", Range_Cell);
        const res_save = await googleSheetsInstance.spreadsheets.values.update({
          auth, //auth object
          spreadsheetId, //spreadsheet id
          range: Range_Cell, //"Sheet1!A:B" sheet name and range of cells
          valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
          resource: {
            values: [[Team]],
          },
        });
        console.log("save");
        return res_save;
      }
    } else {
      console.log("not save");
      return "not save";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { saveData_googleAPI };
