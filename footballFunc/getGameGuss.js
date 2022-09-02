const { google } = require("googleapis");

const getGameGuss = async function (
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  sheetTitle,
  columnLetter1,
  columnLetter2,
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
    // console.log("UsersIndex", UsersIndex);
    for (let u = 0; u < UsersIndex.length; u++) {
      if (user_name === UsersIndex[u]._rawData[0]) {
        index = UsersIndex[u]._rawData[1];
        console.log("index", index);
      }
    }
    console.log(parseInt(cycleIndexNum));
    console.log(parseInt(index) - 2);
    console.log(
      GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1]
    );

    if (
      GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
      user_name
    ) {
      const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
      console.log("idxs_gg", raw_idx);

      Range_Cell =
        sheetTitle +
        "!" +
        columnLetter1 +
        (raw_idx + 2) +
        ":" +
        columnLetter2 +
        (raw_idx + 2);
      console.log("Range_Cell", Range_Cell);
      //Read front the spreadsheet
      const readData = await googleSheetsInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id
        range: Range_Cell, //range of cells to read from.
      });

      console.log("save");
      return readData;
    } else {
      console.log("not save");
      return "not find game";
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { getGameGuss };
