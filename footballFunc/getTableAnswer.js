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
    const number = `${tableObj[tableName][i][0]}`;
    const name = isClalitTable
      ? `${tableObj[tableName][i][2]}`
      : `${tableObj[tableName][i][1]}`;
    const start1Text = isClalitTable
      ? `${start1}: ${tableObj[tableName][i][3]}`
      : `${start1}: ${tableObj[tableName][i][2]}`;
    const start2Text = isClalitTable
      ? `${start2}: ${tableObj[tableName][i][4]}`
      : `${start2}: ${tableObj[tableName][i][3]}`;

    const row =
      `\n${number}. ${name}` + `\n${start1Text}` + `\n${start2Text}` + `\n`;

    tableString = tableString + row;
  }

  const textMessageTable = tableString;

  return textMessageTable;
};

module.exports = { getTableAnswer };
