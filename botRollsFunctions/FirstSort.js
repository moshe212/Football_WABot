const { footballFunc } = require("../footballFunc");

const FirstSort = async function ({
  stage,
  UsersList,
  user_name,
  UsersIndex,
  cycleDate,
}) {
  let textMessage1 = "";
  let textMessage2 = "";
  let textMessage3 = "";
  let isFirst = true;

  switch (stage) {
    case 110:
    case 253:
      console.log("UsersList", UsersList);
      if (!UsersList.includes(user_name)) {
        console.log("not includs");
        textMessage1 =
          "אהלן, אני הבוט של *היציע: ליגת העל*" +
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
        UsersIndex = await footballFunc.getDataFromSheet(
          "אינדקס משתמשים",
          "LigatAl"
        );
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
        textMessage1 =
          "היי, נעים מאוד אני הבוט של *היציע. מוזמנים לקרוא לי בוטי.*" +
          // moment().year() +
          "\nמה ברצונכם לעשות?";
        textMessage2 =
          "\n1️⃣ - למשחק *היציע: ליגת העל*" +
          "\n2️⃣ - למשחק *היציע: NBA*" +
          "\n3️⃣ - למשחק *היציע: אולימפיאדה*" +
          "\n4️⃣ - למשחק *היציע: מונדיאל*" +
          "\n5️⃣ - למשחק *היציע: כדורגל עולמי*";
      } else {
        textMessage1 = "מה קורה נשמות? שמח שחזרתם!" + "\nמה ברצונכם לעשות?";
        textMessage2 =
          "\n1️⃣ - למשחק *היציע: ליגת העל*" +
          "\n2️⃣ - למשחק *היציע: NBA*" +
          "\n3️⃣ - למשחק *היציע: אולימפיאדה*" +
          "\n4️⃣ - למשחק *היציע: מונדיאל*" +
          "\n5️⃣ - למשחק *היציע: כדורגל עולמי*";
      }

      break;

    case 113:
      textMessage1 =
        "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
        "*" +
        cycleDate +
        "*" +
        " בחצות. יאללה ביי! 😎 ";
      break;
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { FirstSort };
