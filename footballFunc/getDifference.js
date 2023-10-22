const getDifference = (message) => {
  let diff = "";
  switch (message) {
    case 1:
      diff = "1-4";
      break;
    case 2:
      diff = "5-7";
      break;
    case 3:
      diff = "8-10";
      break;
    case 4:
      diff = "11-14";
      break;
    case 5:
      diff = "16+";
      break;
  }
  console.log("diff", diff);
  return diff;
};

module.exports = { getDifference };
