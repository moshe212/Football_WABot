const getTableAnswer = async (tableName, tableObj) => {
  const isClalitTable = tableName === "clalitTable";
  const start1 = isClalitTable
    ? tableObj[tableName][0][3]
    : tableObj[tableName][0][2];
  const start2 = isClalitTable
    ? tableObj[tableName][0][4]
    : tableObj[tableName][0][3];

  let tableString = "";
  for (let i = 1; i < tableObj[tableName].length; i++) {
    // console.log(tableObj[tableName][i][1].trim(), length);

    const number = `${tableObj[tableName][i][0]}`;
    const name = isClalitTable
      ? `${tableObj[tableName][i][2]}`
      : `${tableObj[tableName][i][1]}`;
    const start1Text = isClalitTable
      ? `\n${start1}: ${tableObj[tableName][i][3]}`
      : `\n${start1}: ${tableObj[tableName][i][2]}`;
    const start2Text = isClalitTable
      ? `\n${start2}: ${tableObj[tableName][i][4]}`
      : `\n${start2}: ${tableObj[tableName][i][3]}`;

    console.log("start1", start1);
    console.log("start2", start2);
    console.log(number);
    console.log(name);
    console.log(start1Text);
    console.log(start2Text);
    const row =
      `\n${number}${name}` +
      `\n${start1}:${start1Text}` +
      `\n${start2}:${start2Text}` +
      `\n`;

    tableString = tableString + row;
  }

  const textMessageTable = tableString;

  return textMessageTable;
};

module.exports = { getTableAnswer };
