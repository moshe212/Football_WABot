const moment = require("moment");

const getCycle = async (data) => {
  //   console.log(data);
  let isBetween = false;
  let cycleText = "";
  for (let i = 0; i < data.length; i++) {
    const startDate = moment(
      data[i]._rawData[0].replace("/", "-"),
      "DD-MM-YYYY"
    );
    const endDate = moment(data[i]._rawData[1].replace("/", "-"), "DD-MM-YYYY");
    const CurrentDate = moment();
    // console.log(
    //   startDate,
    //   endDate,
    //   CurrentDate,
    //   moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]"),
    //   moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    // );

    if (
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]") ||
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    ) {
      isBetween = true;
      console.log(startDate, endDate, CurrentDate, cycleText, isBetween);
      cycleText = data[i]._rawData[2];
      break;
    }
  }
  if (!cycleText.includes("זמן ניחושים")) {
    const cycleNum = cycleText.substring(cycleText.length - 2).trim();
    return cycleNum;
  } else {
    return 0;
  }
};

module.exports = { getCycle };
