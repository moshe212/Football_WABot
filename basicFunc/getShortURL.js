const fetch = require("node-fetch");
// import fetch from "node-fetch";
// const axios = require("axios");

const getShortURL = async ({ id }) => {
  console.log({ id });
  const url = "https://api.short.io/links/public";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "pk_xHnKCtuyiQElJK41",
    },
    body: JSON.stringify({
      domain: "rotemhr.link",
      originalURL: `http://192.117.146.232:3000/QestionForm?misraID=${id}`,
    }),
  };

  try {
    const res = await fetch(url, options);
    console.log("res");
    const resJson = await res.json();
    console.log("json:", resJson);
    return resJson;
  } catch (err) {
    console.log("error:", err);
  }
};

module.exports = { getShortURL };
