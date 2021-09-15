const moment = require("moment");

const getCycle = (data) => {
  let isBetween = false;
  for (let i = 0; i < data.length; i++) {
    // console.log(Data[i]);
    const startDate = moment(
      data[i]._rawData[0].replace("/", "-"),
      "DD-MM-YYYY"
    );
    const endDate = moment(data[i]._rawData[1].replace("/", "-"), "DD-MM-YYYY");
    const CurrentDate = moment();
    const cycleNum = data[i]._rawData[2];

    if (
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]") ||
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    ) {
      isBetween = true;
      console.log(startDate, endDate, CurrentDate, cycleNum, isBetween);
      break;
    }
  }
  return cycleNum;
};

module.exports = getCycle;
