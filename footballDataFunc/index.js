const { getNBAData } = require("./getNBAData");
const { getEuroData } = require("./getEuroData");

const footballDataFunc = {
  getNBAData,
  getEuroData,
};

module.exports = { footballDataFunc };
// module.exports = { connectToDB };
