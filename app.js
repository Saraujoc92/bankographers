var express = require("express");
var service = require("./request.js");

var app = express();
app.set("view engine", "ejs");
const port = 3000;

app.get("/getMap", async (req, res) => {
  console.log(req.query);
  const { coords } = await service.getMap(req.query.location);
  res.render("index", {
    name: `${req.query.name}`,
    lat: coords.lat,
    lon: coords.long,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
