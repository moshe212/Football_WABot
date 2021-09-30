const { getDataFromSheet } = require("./getDataFromSheet");
const { getCycle } = require("./getCycle");
const { saveData } = require("./saveData");
const { saveData_Full } = require("./saveData_Full");

const footballFunc = { getDataFromSheet, getCycle, saveData, saveData_Full };

module.exports = { footballFunc };
// module.exports = { connectToDB };
