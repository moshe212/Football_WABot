const { google } = require("googleapis");

const getTablesData = async function () {
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
  const spreadsheetId = "1J3iFj9uM3TEC3y__u02PFnq5M5YKSezXP6TVYOEGMto";

  const letersArray = [
    ["clalitTable", "A", "E"],
    ["roundOne", "G", "I"],
    ["roundTow", "L", "O"],
    ["playoffTable", "Q", "T"],
    ["gamesTable", "V", "Y"],
    ["bumsTable", "AA", "AD"],
    ["bombotTable", "AF", "AI"],
    ["hirushimotTable", "AK", "AN"],
    ["srakTable", "AP", "AS"],
    ["hesegimTable", "AU", "AX"],
    ["diamondTable", "AZ", "BC"],
    ["goldTAble", "BE", "BH"],
    ["silverTable", "BJ", "BM"],
    ["bronzeTable", "CA", "CE"],
    ["seasonTable", "CG", "CK"],
    ["gameOfSeasonTable", "CM", "CQ"],
    ["finalGaviaTable", "CS", "CW"],
  ];

  const tables = Promise.all(
    letersArray.map(async (coupel) => {
      const tablePromise = new Promise((resolve, reject) => {
        googleSheetsInstance.spreadsheets.values
          .get({
            auth, //auth object
            spreadsheetId, //spreadsheet id
            range: `טבלאות כלליות!${coupel[1]}5:${coupel[2]}83`, //"Sheet1!A:B" sheet name and range of cells
            valueRenderOption: "FORMATTED_VALUE",
          })
          .then((dataTable) => {
            const tableObj = { [coupel[0]]: dataTable.data.values };
            resolve(tableObj);
          });
      });
      return tablePromise;
    })
  );

  return tables;
};

module.exports = { getTablesData };