const { GoogleSpreadsheet } = require("google-spreadsheet");
const moment = require("moment");

const saveData_Full = async function (
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
  const creds = require("../config/CreditTransaction-d9fe1ef7e128.json");
  // Initialize the sheet - doc ID is the long id in the sheets URL

  const id =
    fileName === "LigatAl"
      ? "1J3iFj9uM3TEC3y__u02PFnq5M5YKSezXP6TVYOEGMto"
      : fileName === "Alufot"
      ? "1a8XbSk7anY4S0SvyJawCqrYYcae4WUN3C-NUO7_K-ys"
      : "";
  const doc = new GoogleSpreadsheet(id);

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
      console.log("1", parseInt(cycleIndexNum), parseInt(index) - 2);
      console.log(
        "2",
        GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]
      );
      if (
        GuessData[parseInt(cycleIndexNum) + parseInt(index) - 2]._rawData[1] ===
        user_name
      ) {
        const raw_idx = parseInt(cycleIndexNum) + parseInt(index) - 2;
        console.log("idxs", raw_idx);
        //   await sheet.loadCells("A1:CP" + rawindex);
        if (!Team) {
          if (sheetTitle === "גביע המדינה") {
            await sheet.loadCells("A" + raw_idx + ":IO" + (raw_idx + 2));
          } else {
            await sheet.loadCells("A" + raw_idx + ":GF" + (raw_idx + 2));
          }

          const cell_team1 = sheet.getCellByA1(columnLetter1 + (raw_idx + 2));
          const cell_team2 = sheet.getCellByA1(columnLetter2 + (raw_idx + 2));
          cell_team1.value = parseInt(score1);
          cell_team2.value = parseInt(score2);

          const res_save = await sheet.saveUpdatedCells();
          console.log("save");
          return res_save;
        } else {
          if (sheetTitle === "גביע המדינה") {
            await sheet.loadCells("A" + raw_idx + ":IO" + (raw_idx + 2));
          } else {
            await sheet.loadCells("A" + raw_idx + ":GF" + (raw_idx + 2));
          }
          const cell_up = sheet.getCellByA1(columnLetter1 + (raw_idx + 2));
          console.log("Team", Team);
          cell_up.value = Team;

          const res_save = await sheet.saveUpdatedCells();
          console.log("save");
          return res_save;
        }
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
