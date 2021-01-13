var express = require("express");
var service = require("./request.js");

var app = express();
const port = 3000;

app.get("/getMap", async (req, res) => {
  console.log(req.query);
  res.send({ res: await service.getMap(req.query.location) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
