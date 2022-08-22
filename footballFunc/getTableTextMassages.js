// const { footballFunc } = require("../footballFunc");
// const getTableAnswer = require("./getTableAnswer");

const getTableTextMassages = async function ({ stage, tableObj }) {
  let tableName = "";
  let tableString = "";
  let textMessage1 = "";

  switch (stage) {
    case 252:
      textMessage1 =
        "בחרו את קטוגריית הטבלאות בה תרצו לצפות " +
        "\n1️⃣ לטבלה הכללית" +
        "\n2️⃣ לטבלה השבועית" +
        "\n3️⃣ לטבלאות הסיבובים" +
        "\n4️⃣ לטבלאות הליגות" +
        "\n5️⃣ לטבלאות ההישגים" +
        "\n6️⃣ לטבלאות השאלונים" +
        "\n0️⃣ חזרה לתפריט הקודם";

      break;

    case 267:
      tableName = "clalitTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 268:
      tableName = "clalitTable"; //weekTable ??
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 269:
      textMessage1 =
        "באיזו טבלה תרצה לצפות? " +
        "\n1️⃣ טבלת הסיבוב הראשון" +
        "\n2️⃣ טבלת הסיבוב השני" +
        "\n3️⃣ טבלת הפלייאוף" +
        "\n0️⃣ חזרה לתפריט הקודם";
      break;

    case 270:
      textMessage1 =
        "בחרו את קטוגריית הטבלאות בה תרצו לצפות " +
        "\n1️⃣ טבלת המשחקים" +
        "\n2️⃣ טבלת הפצצות" +
        "\n3️⃣ טבלת הבומבות" +
        "\n4️⃣ טבלת ההירושימות" +
        "\n5️⃣ טבלת הסרק" +
        "\n6️⃣ טבלת ההישגים" +
        "\n0️⃣ חזרה לתפריט הקודם";
      break;

    case 271:
      textMessage1 =
        "בחרו את קטוגריית הטבלאות בה תרצו לצפות " +
        "\n1️⃣ טבלת ליגת היהלום" +
        "\n2️⃣ טבלת ליגת הזהב" +
        "\n3️⃣ טבלת ליגת הכסף" +
        "\n4️⃣ טבלת ליגת הארד" +
        "\n0️⃣ חזרה לתפריט הקודם";
      break;

    case 272:
      textMessage1 =
        "בחרו את קטוגריית הטבלאות בה תרצו לצפות " +
        "\n1️⃣ טבלת שאלון העונה" +
        "\n2️⃣ טבלת שאלון משחק העונה" +
        "\n3️⃣ טבלת שאלון גמר הגביע" +
        "\n0️⃣ חזרה לתפריט הקודם";
      break;

    case 274:
      tableName = "roundOne";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 275:
      tableName = "roundTow";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 276:
      tableName = "playoffTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    //games tables
    case 278:
      tableName = "gamesTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 279:
      tableName = "bumsTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 280:
      tableName = "bombotTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 281:
      tableName = "hirushimotTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 282:
      tableName = "srakTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 283:
      tableName = "hesegimTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 285:
      tableName = "diamondTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 286:
      tableName = "goldTAble";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 287:
      tableName = "silverTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 288:
      tableName = "bronzeTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 290:
      tableName = "seasonTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 291:
      tableName = "gameOfSeasonTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 292:
      tableName = "bronzeTable";
      tableString = await getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;
  }
  return textMessage1;
};

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

module.exports = { getTableTextMassages };
