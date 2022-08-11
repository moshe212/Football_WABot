const nodeHtmlToImage = require("node-html-to-image");

const getImage = async () => {
  const image = await nodeHtmlToImage({
    html: "<html><body><div>Check out what I just did! #cool</div></body></html>",
  });
  //   res.writeHead(200, { 'Content-Type': 'image/png' });
  //   res.end(image, 'binary');
  return image;
};

module.exports = { getImage };
