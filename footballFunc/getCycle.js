const moment = require("moment");

const getCycle = (data) => {
  console.log(data);
  let isBetween = false;
  let cycleNum = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(Data[i]);
    const startDate = moment(
      data[i]._rawData[0].replace("/", "-"),
      "DD-MM-YYYY"
    );
    const endDate = moment(data[i]._rawData[1].replace("/", "-"), "DD-MM-YYYY");
    const CurrentDate = moment();
    cycleNum = data[i]._rawData[2];

    if (
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]") ||
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    ) {
      isBetween = true;
      console.log(startDate, endDate, CurrentDate, cycleNum, isBetween);
      //   return [startDate, endDate, CurrentDate, cycleNum, isBetween];
    }
  }
  return cycleNum;
};

module.exports = { getCycle };
