const moment = require("moment");

const getCycle = async (data) => {
  //   console.log(data);
  let isBetween = false;
  let cycleText = "";
  let startDate = "";
  let endDate = "";
  for (let i = 0; i < data.length; i++) {
    startDate = moment(data[i]._rawData[0].replace("/", "-"), "DD-MM-YYYY");
    endDate = moment(data[i]._rawData[1].replace("/", "-"), "DD-MM-YYYY");
    const CurrentDate = moment("20/09/2021").format("DD-MM-YYYY");
    console.log(
      startDate,
      endDate,
      CurrentDate,
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]"),
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    );

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
    const endGuessTime = moment(endDate).add(1, "days");
    return [cycleNum, endGuessTime];
  } else {
    const endGuessTime = moment(endDate).add(1, "days");
    return [0, endGuessTime];
  }
};

module.exports = { getCycle };
