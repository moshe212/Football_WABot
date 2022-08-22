const { footballFunc } = require("./footballFunc");

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
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 268:
      tableName = "clalitTable"; //weekTable ??
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

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
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 275:
      tableName = "roundTow";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 276:
      tableName = "playoffTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    //games tables
    case 278:
      tableName = "gamesTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 279:
      tableName = "bumsTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 280:
      tableName = "bombotTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 281:
      tableName = "hirushimotTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 282:
      tableName = "srakTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 283:
      tableName = "hesegimTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 285:
      tableName = "diamondTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 286:
      tableName = "goldTAble";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 287:
      tableName = "silverTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 288:
      tableName = "bronzeTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 290:
      tableName = "seasonTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 291:
      tableName = "gameOfSeasonTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;

    case 292:
      tableName = "bronzeTable";
      tableString = await footballFunc.getTableAnswer(tableName, tableObj);

      textMessage1 = tableString;
      break;
  }
  return textMessage1;
};

module.exports = { getTableTextMassages };
