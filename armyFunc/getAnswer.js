const { saveData } = require("./saveData");
const moment = require("moment");

const getAnswer = async function (rullID, data, phoneNumber) {
  let textMessage1 = "";
  let textMessage2 = "";
  let textMessage3 = "";
  const time = moment().format("MMMM Do YYYY, h:mm:ss a");

  switch (rullID) {
    case 1067:
      textMessage1 =
        "ברוכים הבאים לחמ״ל שלנו." +
        "\nאנחנו הצבא של דוד ואנחנו פה לכל אורך המלחמה כדי לסייע לכל מי שאפשר במגוון רחב של תחומים." +
        "\nבחרו את התחום בו אתם צריכים סיוע:" +
        "\n1️⃣ - איתור נעדרים" +
        "\n2️⃣ - תמיכה רגשית" +
        // "\n3️⃣ - ציוד לחיילים" +
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
        "אנא כתבו בהודעה אחת קצרה, ממוקדת ולא ארוכה מידי את הסיוע לו אתם זקוקים.";
      break;

    case 1089:
      console.log("1089", phoneNumber);
      await saveData("איתור נעדרים", "B2", data, true, phoneNumber);
      await saveData("איתור נעדרים", "E", time, false, phoneNumber);

      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";
      break;

    case 1090:
      await saveData("תמיכה רגשית", "B2", data, true, phoneNumber);
      await saveData("תמיכה רגשית", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1091:
      await saveData("ציוד לחיילים", "B2", data, true, phoneNumber);
      await saveData("ציוד לחיילים", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1092:
      await saveData("לינה ואירוח", "B2", data, true, phoneNumber);
      await saveData("לינה ואירוח", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1093:
      await saveData("מזון ושתיה", "B2", data, true, phoneNumber);
      await saveData("מזון ושתיה", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1094:
      await saveData("ביגוד", "B2", data, true, phoneNumber);
      await saveData("ביגוד", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1095:
      await saveData("הסעות ומשלוחים", "B2", data, true, phoneNumber);
      await saveData("הסעות ומשלוחים", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1096:
      await saveData("סיוע לילדים ומשפחות", "B2", data, true, phoneNumber);
      await saveData("סיוע לילדים ומשפחות", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1097:
      await saveData("תרומות כספיות", "B2", data, true, phoneNumber);
      await saveData("תרומות כספיות", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    case 1098:
      await saveData("אחר", "B2", data, true, phoneNumber);
      await saveData("אחר", "E", time, false, phoneNumber);
      textMessage1 = "כתבו את שמכם המלא, שם פרטי ושם משפחה.";

      break;

    //------------------------------------

    case 1099:
      await saveData("איתור נעדרים", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";
      break;

    case 1100:
      await saveData("תמיכה רגשית", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1101:
      await saveData("ציוד לחיילים", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1102:
      await saveData("לינה ואירוח", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1103:
      await saveData("מזון ושתיה", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1104:
      await saveData("ביגוד", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1105:
      await saveData("הסעות ומשלוחים", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1106:
      await saveData("סיוע לילדים ומשפחות", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1107:
      await saveData("תרומות כספיות", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    case 1108:
      await saveData("אחר", "C", data, false, phoneNumber);
      textMessage1 =
        "כתבו את מספר הטלפון שלכם או של גורם אחר על מנת שנוכל לחזור אליו ולסייע בבקשה.";

      break;

    //------------------------------------

    case 1109:
      await saveData("איתור נעדרים", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1110:
      await saveData("תמיכה רגשית", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1111:
      await saveData("ציוד לחיילים", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1112:
      await saveData("לינה ואירוח", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1113:
      await saveData("מזון ושתיה", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1114:
      await saveData("ביגוד", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1115:
      await saveData("הסעות ומשלוחים", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1116:
      await saveData("סיוע לילדים ומשפחות", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1117:
      await saveData("תרומות כספיות", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;

    case 1118:
      await saveData("אחר", "D", data, false, phoneNumber);
      textMessage1 = "תודה על הזכות לסייע ולעזור!";
      textMessage2 = "החיילים בצבא של דוד יצרו איתך קשר בהקדם האפשרי! ";
      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { getAnswer };
