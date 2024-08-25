const http = require("http");
const fs = require("fs");
const url = require("url");

// from dev-data folder
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

// from templates folder
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/temp-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/temp-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/temp-card.html`,
  "utf-8"
);

// Replace Template Function
const replaceTemplate = function (template, product) {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);

  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

// SERVER
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const productHtml = dataObj.map((product) =>
      replaceTemplate(tempCard, product)
    );

    const output = tempOverview.replace(/{%PRODUCT__CARDS%}/g, productHtml);

    res.end(output);
  } else if (pathname === "/product") {
    const output = replaceTemplate(tempProduct, dataObj[query.id]);

    res.end(output);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("PAGE NOT FOUND");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("server connected");
});
