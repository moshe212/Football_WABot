const { saveData } = require("./saveData");

const getAnswer = async function (rullID, data) {
  let textMessage1 = "";
  let textMessage2 = "";
  let textMessage3 = "";

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
    case 1068:
    case 1080:
    case 1081:
    case 1082:
    case 1083:
    case 1084:
    case 1085:
    case 1086:
    case 1087:
    case 1088:
      textMessage1 =
        "אנא כתבו בהודעה אחת קצרהֿ, ממוקדת ולא ארוכה מידי את הסיוע לו אתם זקוקים.";
      break;

    case 1089:
      await saveData("איתור נעדרים", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";
      break;

    case 1090:
      await saveData("תמיכה רגשית", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1091:
      await saveData("ציוד לחיילים", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1092:
      await saveData("לינה ואירוח", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1093:
      await saveData("מזון ושתיה", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1094:
      await saveData("ביגוד", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1095:
      await saveData("הסעות ומשלוחים", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1096:
      await saveData("סיוע לילדים ומשפחות", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1097:
      await saveData("תרומות כספיות", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;

    case 1098:
      await saveData("אחר", "A", null, data);
      textMessage1 = "כתבו את שמכם המלא. שם פרטי ואח״כ שם משפחה";

      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { getAnswer };
