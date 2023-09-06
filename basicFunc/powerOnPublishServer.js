const axios = require("axios");

const clientId = process.env.CLIENT_ID;
const secret = process.env.SECRET;

const serverId = process.env.SERVER_ID;
const power = "on";

const url = `https://console.kamatera.com/service/server/${serverId}/power`;

const config = {
  headers: {
    AuthClientId: clientId,
    AuthSecret: secret,
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const toggleServerPower = async () => {
  try {
    const response = await axios.put(url, { power }, config);
    const body = response.data;
    const status = response.status;
    console.log(body);
    console.log(status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { toggleServerPower };
