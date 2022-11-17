const { getDataFromSheet } = require("./getDataFromSheet");

const firstSort = async function (
  stage,
  UsersList,
  user_name,
  UsersIndex,
  cycleDate,
  fileName
) {
  let textMessage1 = "";
  let textMessage2 = "";
  let textMessage3 = "";
  let isFirst = true;

  switch (stage) {
    case 110:
    case 253:
    case 256:
    case 257:
      console.log("UsersList", UsersList);
      if (!UsersList.includes(user_name)) {
        console.log("not includs");
        const game =
          fileName === "LigatAl"
            ? "ליגת העל"
            : fileName === "Alufot"
            ? "ליגת האלופות"
            : fileName === "Mondial"
            ? "מונדיאל"
            : "";
        textMessage1 =
          "אהלן, אני הבוט של *היציע: " +
          game +
          // moment().year() +
          "\nאינך רשאי להשתמש בבוט. ";
        break;
      }

      for (let l = 0; l < UsersIndex.length; l++) {
        if (user_name === UsersIndex[l]._rawData[0]) {
          const first = UsersIndex[l]._rawData[2];
          if (first === "1") {
            isFirst = false;
          }
        }
      }

      if (isFirst) {
        UsersIndex = await getDataFromSheet("אינדקס משתמשים", fileName);
        for (let l = 0; l < UsersIndex.length; l++) {
          if (user_name === UsersIndex[l]._rawData[0]) {
            const first = UsersIndex[l]._rawData[2];
            if (first === "1") {
              isFirst = false;
            }
          }
        }
      }
      if (isFirst) {
        if (fileName === "LigatAl") {
          textMessage1 =
            "ברוכים הבאים למשחק *היציע: ליגת העל* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - להישגי העונה שלכם \n3️⃣ - לקבוצת ה-Whatsapp הרשמית \n4️⃣ - לטבלאות \n5️⃣ - לחזרה לתפריט הראשי";
        } else if (fileName === "Alufot") {
          textMessage1 =
            "ברוכים הבאים למשחק *היציע: ליגת האלופות* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - לניחושי שלב הנוקאאוט\n3️⃣ - להישגי העונה שלכם \n4️⃣ - לקבוצת ה-Whatsapp הרשמית \n5️⃣ - לטבלאות\n6️⃣ - לחזרה לתפריט הראשי";
        } else if (fileName === "Mondial") {
          textMessage1 =
            "ברוכים הבאים למשחק *היציע: מונדיאל* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי שלב הבתים \n2️⃣ - לניחושי שלב הנוקאאוט" +
            // "\n3️⃣ - להישגי העונה שלכם "+
            "\n4️⃣ - לקבוצת ה-Whatsapp הרשמית " +
            // "\n5️⃣ - לטבלאות"+
            "\n6️⃣ - לקובץ הלייב" +
            "\n0️⃣ - לחזרה לתפריט הראשי";
        }
      } else {
        if (fileName === "LigatAl") {
          textMessage1 = "מה קורה נשמות? שמח שחזרתם!" + "\nמה ברצונכם לעשות?";
          textMessage2 =
            "ברוכים הבאים למשחק *היציע: ליגת העל* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - להישגי העונה שלכם \n3️⃣ - לקבוצת ה-Whatsapp הרשמית \n4️⃣ - לטבלאות \n5️⃣ - לחזרה לתפריט הראשי";
        } else if (fileName === "Alufot") {
          textMessage1 = "מה קורה נשמות? שמח שחזרתם!" + "\nמה ברצונכם לעשות?";
          textMessage2 =
            "ברוכים הבאים למשחק *היציע: ליגת האלופות* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - לניחושי שלב הנוקאאוט\n3️⃣ - להישגי העונה שלכם \n4️⃣ - לקבוצת ה-Whatsapp הרשמית \n5️⃣ - לטבלאות\n6️⃣ - לחזרה לתפריט הראשי";
        } else if (fileName === "Mondial") {
          textMessage1 = "מה קורה נשמות? שמח שחזרתם!" + "\nמה ברצונכם לעשות?";
          textMessage2 =
            "ברוכים הבאים למשחק *היציע: מונדיאל* \nבחרו מהאפשרויות הבאות: \n1️⃣ - לניחוש משחקי המחזור \n2️⃣ - לניחושי שלב הנוקאאוט" +
            // "\n3️⃣ - להישגי העונה שלכם "+
            "\n4️⃣ - לקבוצת ה-Whatsapp הרשמית " +
            // "\n5️⃣ - לטבלאות"+
            "\n6️⃣ - לקובץ הלייב" +
            "\n0️⃣ - לחזרה לתפריט הראשי";
        }
      }

      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { firstSort };
