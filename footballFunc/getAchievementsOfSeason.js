const getAchievementsOfSeason = async function (
  user_name,
  AchievementsOfSeasonData,
  UsersIndex
) {
  try {
    let index = null;
    console.log({ user_name });
    // console.log("UsersIndex", UsersIndex);
    for (let u = 0; u < UsersIndex.length; u++) {
      if (user_name === UsersIndex[u]._rawData[0]) {
        index = parseInt(UsersIndex[u]._rawData[1]) + 2;
        console.log("index", index);
      }
    }

    const headers = AchievementsOfSeasonData[0]._rawData;
    const rowData = AchievementsOfSeasonData[index]._rawData;
    // console.log(rowData);
    let allAchievementsOfSeasonOfUser = [];

    for (let i = 0; i < rowData.length; i++) {
      allAchievementsOfSeasonOfUser.push({
        headers: headers[i],
        data: rowData[i],
      });
    }
    console.log({ allAchievementsOfSeasonOfUser });

    return allAchievementsOfSeasonOfUser;
  } catch (e) {
    console.error;
  }
};

module.exports = { getAchievementsOfSeason };
