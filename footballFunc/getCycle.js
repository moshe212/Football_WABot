const moment = require("moment");

const getCycle = async (data) => {
  //   console.log(data);
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
    console.log(
      startDate,
      endDate,
      CurrentDate,
      moment(CurrentDate.format("DD-MM-YYYY")).isBetween(
        startDate,
        endDate,
        undefined,
        "(]"
      ),
      moment(CurrentDate.format("DD-MM-YYYY")).isBetween(
        startDate,
        endDate,
        undefined,
        "[)"
      )
    );

    if (
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "(]") ||
      moment(CurrentDate).isBetween(startDate, endDate, undefined, "[)")
    ) {
      isBetween = true;
      console.log(startDate, endDate, CurrentDate, cycleNum, isBetween);
      cycleNum = data[i]._rawData[2];
      break;
      //   return [startDate, endDate, CurrentDate, cycleNum, isBetween];
    }
  }
  return cycleNum;
};

module.exports = { getCycle };
