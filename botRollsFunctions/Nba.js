const { footballFunc } = require("../footballFunc");

const Nba = async function ({
  message,
  cycleDate,
  cycleText,
  cycleNum,
  GamesList,
  cycleIndexNum,
  UsersIndex,
  GuessData,
  user_name,
  stage,
  score,
  UsersList,
}) {
  let teamUp_ToFix = "";
  let minute_toFix = "";
  let teamUp_ToFix_Num = "";
  let GameRow;
  let ScoreTeam1 = 0;
  let ScoreTeam2 = 0;
  let textMessage1 = "empty";
  let textMessage2 = "empty";
  let textMessage3 = "empty";
  let summaryText = "";
  let winNumFix = "";
  let scoreFix = "";
  let differenceFix = "";
  let gameNumFix = "";

  let Team1 = "";
  let Team2 = "";
  let Day = "";
  let Date = "";
  let Hour = "";
  let Channel = "";
  let winTeam = "";
  let number = "";
  let totalScore = "";
  let textMessagesObj = {};
  let gameNum = "";
  let ChoiseUp = "";
  let ChoiseUpteam = "";
  let ChoiseMinut = "";
  let Minuts = "";
  let GuessData_Saved = [];
  let textMessage = "";

  const Qestion1a = "*שאלה ראשונה:* איזו קבוצה תנצח את המשחק?";
  const Qestion1b = "\n1️⃣ - בית" + "\n2️⃣ - חוץ";

  const Qestion2a = "*שאלה שניה:* מה יהיה ההפרש בו יסתיים המשחק? (כולל הארכות)";
  const Qestion2b =
    "\n1️⃣ 1-4" + "\n2️⃣ 5-7" + "\n3️⃣ 8-10" + "\n4️⃣ 11-14" + "\n5️⃣ 15+";

  const Qestion3 =
    "\n*שאלה שלישית:* מה סך הנקודות שיקלעו שתי הקבוצות יחד בתום המשחק? (כולל הארכות)";

  let cycle =
    cycleNum === "גמר ומקום 3" ? "משחק הגמר והמשחק על המקום ה-3" : cycleNum;

  console.log("Nba");
  console.log("stage", stage);
  if (stage === 255) {
    console.log("stage-255");
    const firstMessages = await footballFunc.firstSort(
      stage,
      UsersList,
      user_name,
      UsersIndex,
      cycleDate,
      "NBA"
    );

    textMessage1 = firstMessages[0];
    textMessage2 = firstMessages[1];
    textMessage3 = firstMessages[2];
  } else {
    switch (stage) {
      case 802:
        textMessage1 =
          "הנה רשימת הלינקים למשחק" +
          "\nלינק לקובץ הלייב:" +
          "\n https://docs.google.com/spreadsheets/d/15ylTw286Rh9wc5o9uHrcZIucTDRL5jCijmjp20mLQ0k/edit" +
          "\nלינק לקובץ החוקים והכללים:" +
          "\n https://docs.google.com/document/d/1ZaFB7EdhxMa7xdufF4Xcd6vmEXCub0SYhaaPva8jnmQ/edit" +
          "\nלינק לקבוצת הוואטסאפ:" +
          "\n https://chat.whatsapp.com/GU2MAoTL44i2FLa7BmEFlI";

        textMessage2 = "0️⃣ לחזרה לתפריט הקודם";
        break;

      case 801:
        textMessage1 =
          "בחירה מצוינת!" +
          "\nהדד ליין לשליחת ניחושים *לשבוע משחקים מספר " +
          cycle +
          "* הוא עד ה-" +
          "*" +
          cycleDate +
          "*" +
          " בשעה 14:00 לכל המאוחר." +
          "\nשניה אחרי אני סוגר הבסטה, אז אל תאחרו! שנתחיל?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";

        break;

      case 895:
        textMessage1 =
          "אז מה אתם אוכלים לי את הראש? תחזרו לכאן כשתרצו למלא ניחושים, ותשתדלו שזה יקרה לפני ה-" +
          "*" +
          cycleDate +
          "*" +
          " בשעה 14:00. יאללה ביי! 😎 ";
        break;

      case 894:
        gameNum = "1";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: false,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 898:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "D",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 901:
        number = GamesList[0][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "F",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;

      case 903:
        gameNum = "2";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "H",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;

      case 907:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "J",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 910:
        number = GamesList[1][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "L",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        break;

      case 912:
        gameNum = "3";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "N",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;

      case 916:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "P",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 919:
        number = GamesList[2][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "R",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        break;

      case 921:
        gameNum = "4";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "T",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 923:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "V",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 926:
        number = GamesList[3][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "X",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 928:
        gameNum = "5";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "Z",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;

      case 932:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AB",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 935:
        number = GamesList[4][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AD",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 937:
        gameNum = "6";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AF",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 939:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AH",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 942:
        number = GamesList[5][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AJ",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 944:
        gameNum = "7";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AL",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 946:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AN",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 949:
        number = GamesList[6][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AP",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 951:
        gameNum = "8";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AR",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 953:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AT",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 956:
        number = GamesList[7][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AV",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;
      case 958:
        gameNum = "9";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AX",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;
      case 961:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "AZ",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;

      case 963:
        number = GamesList[8][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "BB",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        break;

      case 965:
        gameNum = "10";
        textMessagesObj = sendQ1({
          GamesList,
          Qestion1a,
          Qestion1b,
          gameNum,
          isNeedToSave: true,
          message,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "BD",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        textMessage3 = textMessagesObj.textMessage3;

        break;

      case 968:
        textMessagesObj = sendQ2({
          message,
          winTeam,
          Qestion2a,
          Qestion2b,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "BF",
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;

        break;

      case 970:
        number = GamesList[9][6];
        textMessagesObj = sendQ3({
          Qestion3,
          number,
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          column: "BH",
          message,
        });
        textMessage1 = textMessagesObj.textMessage1;
        textMessage2 = textMessagesObj.textMessage2;
        break;

      case 973:
        if (parseInt(message) === 1) {
          totalScore = `אנדר`;
        } else {
          totalScore = `אובר`;
        }

        await footballFunc.saveData_googleAPI(
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
          "הניחושים",
          "BJ",
          "",
          "",
          "",
          "",
          totalScore,
          "NBA"
        );

        summaryText = await getSummaryText({
          user_name,
          UsersIndex,
          cycleIndexNum,
          GamesList,
        });

        console.log("973 GuessData", summaryText);

        textMessage1 = `*אלו הניחושים שלכם לשבוע משחקים מספר ${cycle}:* \n${summaryText}`;
        // textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה";
        textMessage2 = "\n1️⃣ לאישור וסיום \n2️⃣ לשינוי ועריכה";

        break;

      case 983:
        textMessage1 = "הניחושים נקלטו. שיהיה בהצלחה";
        textMessage2 =
          "במידה ותרצו לעדכן , כתבו לי היי שוב ונמלא הכל מחדש. לצערי לערוך משחק בודד אחרי אישור הניחושים.";
        textMessage3 = "ניפגש במחזור הבא";

        break;

      case 984:
        summaryText = await getSummaryText({
          user_name,
          UsersIndex,
          cycleIndexNum,
          GamesList,
        });

        textMessage1 = `בחרתם לשנות אחד או יותר מניחושי שבוע משחקים מספר ${cycle}.`;
        textMessage2 =
          `שימו לב למבנה ההודעה שאתם נדרשים לשלוח על מנת לבצע את השינוי, כמו כן בדקו כי אכן הניחוש שלכם השתנה ` +
          "\n" +
          `\n${summaryText}`;
        textMessage3 =
          "יש להשיב במבנה הבא (מספרים משקפים את הפרמטרים השונים):" +
          "\nמשחק 4, ניצחון 2, הפרש 3, נקודות 1" +
          "\n" +
          "\nלהלן הפרמטרים למבנה השינוי:" +
          "\n*ניצחון - *" +
          "\n 1️⃣ בית" +
          "\n 2️⃣ חוץ" +
          "\n" +
          "\n*הפרש - *" +
          "\n 1️⃣ 1-4" +
          "\n 2️⃣ 5-7" +
          "\n 3️⃣ 8-10" +
          "\n 4️⃣ 11-14" +
          "\n 5️⃣ 15+" +
          "\n" +
          "\n*נקודות - *" +
          `\n 1️⃣ אנדר <מספר>` +
          `\n 2️⃣ אובר <מספר>`;

        break;
      case 985:
        gameNumFix = message.split(" ")[1];
        winNumFix = message.split(" ")[3];
        differenceFix = message.split(" ")[5];
        scoreFix = message.split(" ")[7];

        console.log("answer", gameNumFix, winNumFix, differenceFix, scoreFix);

        await footballFunc.saveFix_Nba({
          gameNum: parseInt(gameNumFix),
          winNum: parseInt(winNumFix),
          difference: parseInt(differenceFix),
          score: parseInt(scoreFix),
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
        });

        textMessage1 = "האם תרצו לתקן או לשנות תוצאה נוספת?";
        textMessage2 = "\n 1️⃣ כן \n2️⃣ לא";
        break;
      case 987:
        summaryText = await getSummaryText({
          user_name,
          UsersIndex,
          cycleIndexNum,
          GamesList,
        });

        textMessage1 = `*אלו הניחושים שלכם לשבוע משחקים מספר ${cycle}:* \n${summaryText}`;
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה";
        textMessage3 = "ניפגש במחזור הבא";

        break;

      case 988:
        summaryText = await getSummaryText({
          user_name,
          UsersIndex,
          cycleIndexNum,
          GamesList,
        });

        textMessage1 = `בחרתם לשנות אחד או יותר מניחושי שבוע משחקים מספר ${cycle}.`;
        textMessage2 =
          `שימו לב למבנה ההודעה שאתם נדרשים לשלוח על מנת לבצע את השינוי, כמו כן בדקו כי אכן הניחוש שלכם השתנה ` +
          "\n" +
          `\n${summaryText}`;
        textMessage3 =
          "יש להשיב במבנה הבא (מספרים משקפים את הפרמטרים השונים):" +
          "\nמשחק 4, ניצחון 2, הפרש 3, נקודות 1" +
          "\n" +
          "\nלהלן הפרמטרים למבנה השינוי:" +
          "\n*ניצחון - *" +
          "\n 1️⃣ בית" +
          "\n 2️⃣ חוץ" +
          "\n" +
          "\n*הפרש - *" +
          "\n 1️⃣ 1-4" +
          "\n 2️⃣ 5-7" +
          "\n 3️⃣ 8-10" +
          "\n 4️⃣ 11-14" +
          "\n 5️⃣ 15+" +
          "\n" +
          "\n*נקודות - *" +
          `\n 1️⃣ אנדר <מספר>` +
          `\n 2️⃣ אובר <מספר>`;

        break;
      case 989:
        gameNumFix = message.split(" ")[1];
        winNumFix = message.split(" ")[3];
        differenceFix = message.split(" ")[5];
        scoreFix = message.split(" ")[7];

        console.log("answer", gameNumFix, winNumFix, differenceFix, scoreFix);

        await footballFunc.saveFix_Nba({
          gameNum: parseInt(gameNumFix),
          winNum: parseInt(winNumFix),
          difference: parseInt(differenceFix),
          score: parseInt(scoreFix),
          user_name,
          UsersIndex,
          GuessData,
          cycleIndexNum,
        });

        summaryText = await getSummaryText({
          user_name,
          UsersIndex,
          cycleIndexNum,
          GamesList,
        });

        textMessage1 = `*אלו הניחושים שלכם לשבוע משחקים מספר ${cycle}:* \n${summaryText}`;
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה";
        textMessage3 = "ניפגש במחזור הבא";
        break;
      case 650:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;
      case 649:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;
      case 652:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=1---------
      //if GamesList.length = 1 show the gusses and finish
      case 654:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //453
      case 655:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 656:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=2---------
      //if GamesList.length = 2 and choose 1 show the gusses and finish
      case 658:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //if GamesList.length = 2 and choose 2
      case 659:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 660:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
        minute_toFix = message.split(" ")[7];

        await footballFunc.saveFix_Nokout(
          parseInt(gameNum),
          parseInt(score1),
          parseInt(score2),
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          teamUp_ToFix,
          minute_toFix,
          "Mondial"
        );
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //-----------------------------GamesListLength=4---------
      //if GamesList.length = 2 and choose 1 show the gusses and finish
      case 662:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;

      //if GamesList.length = 2 and choose 2
      case 663:
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          true,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = textMessage[1];
        textMessage3 = textMessage[2];

        break;

      case 664:
        gameNum = message.split(" ")[1];
        score1 = message.split(" ")[3].split(":")[1];
        score2 = message.split(" ")[3].split(":")[0];
        teamUp_ToFix_Num = parseInt(message.split(" ")[5]);
        teamUp_ToFix = GamesList[parseInt(gameNum) - 1][teamUp_ToFix_Num - 1];
        minute_toFix = message.split(" ")[7];

        console.log(
          "answer",
          score1,
          score2,
          gameNum,
          teamUp_ToFix,
          minute_toFix
        );

        await footballFunc.saveFix_Nokout(
          parseInt(gameNum),
          parseInt(score1),
          parseInt(score2),
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          teamUp_ToFix,
          minute_toFix,
          "Mondial"
        );
        // ----------Start fix auto----------------
        await footballFunc.fixAuto_Main_Nokout(
          GamesList,
          user_name,
          UsersIndex,
          GuessData_ShlavHanokout,
          cycleIndexNum,
          "Mondial"
        );

        // ----------End fix auto----------------
        GuessData_Saved = await footballFunc.getSavedGuss_Nokout(
          user_name,
          UsersIndex,
          cycleIndexNum,
          "שלב הנוקאאוט",
          GamesList,
          "Mondial"
        );
        console.log("GuessData_Saved", GuessData_Saved);
        textMessage = await footballFunc.chooseGameToFix_Nokout(
          GuessData_Saved,
          false,
          cycleNum
        );
        console.log(textMessage);
        textMessage1 = textMessage[0];
        textMessage2 = "הניחושים נקלטו. שיהיה בהצלחה!" + "\nניפגש בשלב הבא.";
        break;
    }
  }

  return [textMessage1, textMessage2, textMessage3];
};

module.exports = { Nba };

const sendQ1 = ({
  GamesList,
  Qestion1a,
  Qestion1b,
  gameNum,
  isNeedToSave,
  message,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  column,
}) => {
  // console.log(GamesList);
  console.log("user_name", user_name);

  const gameIndex = parseInt(gameNum) - 1;
  const Team1 = GamesList[gameIndex][0];
  const Team2 = GamesList[gameIndex][1];
  const Day = GamesList[gameIndex][2];
  const Date = GamesList[gameIndex][3];
  const Hour = GamesList[gameIndex][4];
  const Channel = GamesList[gameIndex][5];
  const number = isNeedToSave ? GamesList[gameIndex - 1][6] : "0";

  console.log("Details:", Team1, Team2, Day, Date, Hour, Channel);

  const str1 = `משחק מספר ${gameNum}: `;
  const textMessage1 = `${str1} \n *${Team1} - ${Team2}* \n ${Day}. ה-${Date}. ${Hour} שעון ישראל. ${Channel}`;
  const textMessage2 = Qestion1a;
  // const textMessage3 = user_name != undefined ? fullText : Qestion1b;
  const textMessage3 = Qestion1b;

  if (isNeedToSave) {
    if (parseInt(message) === 1) {
      totalScore = `אנדר`;
    } else {
      totalScore = `אובר`;
    }

    footballFunc.saveData_googleAPI(
      user_name,
      UsersIndex,
      GuessData,
      cycleIndexNum,
      "הניחושים",
      column,
      "",
      "",
      "",
      "",
      totalScore,
      "NBA"
    );
  }

  const textMessages = { textMessage1, textMessage2, textMessage3 };
  return textMessages;
};

const sendQ2 = ({
  message,
  winTeam,
  Qestion2a,
  Qestion2b,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  column,
}) => {
  console.log("message1", message);
  if (parseInt(message) === 1) {
    winTeam = "בית";
  } else {
    winTeam = "חוץ";
  }

  const textMessage1 = Qestion2a;
  const textMessage2 = Qestion2b;

  footballFunc.saveData_googleAPI(
    user_name,
    UsersIndex,
    GuessData,
    cycleIndexNum,
    "הניחושים",
    column,
    "",
    "",
    "",
    "",
    winTeam,
    "NBA"
  );

  const textMessages = { textMessage1, textMessage2 };
  return textMessages;
};

const sendQ3 = ({
  Qestion3,
  number,
  user_name,
  UsersIndex,
  GuessData,
  cycleIndexNum,
  column,
  message,
}) => {
  const difference = footballFunc.getDifference(parseInt(message));

  const textMessage1 = Qestion3;
  const textMessage2 = `\n1️⃣ - אנדר ${number}` + `\n2️⃣ - אובר ${number}`;

  footballFunc.saveData_googleAPI(
    user_name,
    UsersIndex,
    GuessData,
    cycleIndexNum,
    "הניחושים",
    column,
    "",
    "",
    "",
    "",
    difference,
    "NBA"
  );

  const textMessages = { textMessage1, textMessage2 };
  return textMessages;
};

const getSummaryText = async ({
  user_name,
  UsersIndex,
  cycleIndexNum,
  GamesList,
}) => {
  const SavedGuess = await footballFunc.getSavedGuss_Nba({
    user_name,
    UsersIndex,
    cycleIndexNum,
    sheetTitle: "הניחושים",
    GamesList,
    fileName: "NBA",
  });

  let gameIndex = 0;
  let fullText = "";
  for (const game of SavedGuess) {
    const number = GamesList[gameIndex][6];
    const text =
      `*משחק מספר ${gameIndex + 1}:*` +
      `\n*${game.Team1} - ${game.Team2}*` +
      `\nניצחון ${game.Location}` +
      `\n${game.Difference} הפרש` +
      `\nסך הנקודות יהיה: ${game.Under_Over} ${number}}`;
    fullText += text + "\n\n";
    gameIndex++;
  }

  return fullText;
};
