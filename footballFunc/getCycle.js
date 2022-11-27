const moment = require("moment");

const getCycle = async (data) => {
  console.log(data);
  let isBetween = false;
  let cycleText = "";
  let startDate = "";
  let endDate = "";
  let cycleIndex = 0;
  for (let i = 0; i < data.length; i++) {
    startDate = moment(data[i]._rawData[0].replace("/", "-"), "DD-MM-YYYY");
    endDate = moment(data[i]._rawData[1].replace("/", "-"), "DD-MM-YYYY");
    const CurrentDate = moment().format("DD-MM-YYYY");
    const CurrentDate2 = moment().subtract(4, "days").format("DD-MM-YYYY");
    // const CurrentDate = moment("14/12/2021".replace("/", "-"), "DD-MM-YYYY");
    console.log("current", CurrentDate, CurrentDate2);
    // console.log(
    //   startDate,
    //   endDate,
    //   CurrentDate,
    //   moment(CurrentDate, "DD-MM-YYYY").isBetween(
    //     startDate,
    //     endDate,
    //     undefined,
    //     "(]"
    //   ),
    //   moment(CurrentDate, "DD-MM-YYYY").isBetween(
    //     startDate,
    //     endDate,
    //     undefined,
    //     "[)"
    //   )
    // );

    if (
      moment(CurrentDate, "DD-MM-YYYY").isBetween(
        startDate,
        endDate,
        undefined,
        "(]"
      ) ||
      moment(CurrentDate, "DD-MM-YYYY").isBetween(
        startDate,
        endDate,
        undefined,
        "[)"
      )
    ) {
      isBetween = true;
      console.log(startDate, endDate, CurrentDate, cycleText, isBetween);
      cycleText = data[i]._rawData[2];
      cycleIndex = data[i]._rawData[4];
      break;
    }
  }
  if (cycleText.includes("זמן ניחושים")) {
    let cycleNum = "";
    if (cycleText.includes("גביע המדינה")) {
      const arr = cycleText.split(" ");
      cycleNum = arr[4] + " " + arr[5];
    } else if (cycleText.includes("שלב הנוקאאוט")) {
      console.log("נוקאאוט", cycleText);
      const arr = cycleText.split(" ");
      cycleNum = (arr[4] + " " + arr[5] + " " + (arr[6] ? arr[6] : "")).trim();
    } else {
      cycleNum = cycleText.substring(cycleText.length - 2).trim();
    }
    const endGuessTime = moment(endDate);
    return [cycleNum, endGuessTime, cycleIndex, cycleText];
  } else {
    const endGuessTime = moment(endDate);
    // .add(1, "days");
    return ["0", endGuessTime, cycleIndex, cycleText];
  }
};

module.exports = { getCycle };
