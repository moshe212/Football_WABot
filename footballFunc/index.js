const { getDataFromSheet } = require("./getDataFromSheet");
const { getCycle } = require("./getCycle");
const { saveData } = require("./saveData");

const footballFunc = { getDataFromSheet, getCycle, saveData };

module.exports = { footballFunc };
// module.exports = { connectToDB };
