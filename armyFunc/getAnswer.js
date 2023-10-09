const getAnswer = async function (rullID) {
  const textMessage1 = "";
  const textMessage2 = "";

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
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { getAnswer };
