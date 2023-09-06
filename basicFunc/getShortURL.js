const fetch = require("node-fetch");
// import fetch from "node-fetch";
// const axios = require("axios");

const getShortURL = async ({ id }) => {
  console.log({ id });
  const url = "https://api.short.io/links";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "sk_kWHVQfE17XSn37pO,",
    },
    body: JSON.stringify({
      domain: "rotemhr.link",
      originalURL: `http://192.117.146.232:3000/QestionForm?misraID=${id}`,
      path: `misraID=${id}`,
    }),
  };

  // fetch(url, options)
  //   .then((res) => {
  //     console.log("res");
  //     res.json();
  //   })
  //   .then((json) => {
  //     console.log("json:");
  //     console.log(json);
  //     return json;
  //   })
  //   .catch((err) => console.error("error:" + err));

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
