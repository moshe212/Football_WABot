const { await saveData } = require("./await saveData");

const getAnswer = async function (rullID, data) {
  let textMessage1 = "";
  let textMessage2 = "";

  switch (rullID) {
    case 1067:
      textMessage1 =
        "ברוכים הבאים לחמ״ל שלנו." +
        "\nאנחנו הצבא של דוד ואנחנו פה לכל אורך המלחמה כדי לסייע לכל מי שאפשר במגוון רחב של תחומים." +
        "\nבחרו את התחום בו אתם צריכים סיוע:" +
        "\n1️⃣ - איתור נעדרים" +
        "\n2️⃣ - תמיכה רגשית" +
        "\n3️⃣ - ציוד לחיילים" +
        "\n4️⃣ - לינה ואירוח" +
        "\n5️⃣ - מזון ושתיה" +
        "\n6️⃣ - ביגוד" +
        "\n7️⃣ - הסעות ומשלוחים" +
        "\n8️⃣ - סיוע לילדים ומשפחות" +
        "\n9️⃣ - תרומות כספיות" +
        "\n0️⃣ - אחר";
      break;
    case rullID.includes(
      1068,
      1080,
      1081,
      1082,
      1083,
      1084,
      1085,
      1086,
      1087,
      1088
    ):
      textMessage1 =
        "אנא כתבו בהודעה אחת קצרהֿ, ממוקדת ולא ארוכה מידי את הסיוע לו אתם זקוקים.";
      break;

    case 1089:
      await saveData("איתור נעדרים", "A", null, data);
      break;

    case 1090:
      await saveData("תמיכה רגשית", "A", null, data);
      break;

    case 1091:
      await saveData("ציוד לחיילים", "A", null, data);
      break;

    case 1092:
      await saveData("לינה ואירוח", "A", null, data);
      break;

    case 1093:
      await saveData("מזון ושתיה", "A", null, data);
      break;

    case 1094:
      await saveData("ביגוד", "A", null, data);
      break;

    case 1095:
      await saveData("הסעות ומשלוחים", "A", null, data);
      break;

    case 1096:
      await saveData("סיוע לילדים ומשפחות", "A", null, data);
      break;

    case 1097:
      await saveData("תרומות כספיות", "A", null, data);
      break;

    case 1098:
      await saveData("אחר", "A", null, data);
      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { getAnswer };
