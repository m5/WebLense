var express = require("express");
var app = express();
var Pageres = require("pageres");
app.use("/sites", express.static("sites"));
app.use("/", express.static("web"));
app.get("/", function (req, res) {
  res.sendFile(__dirname +
      "web/index.html");
});
app.get("/lense", function (req, res) {
  var imgJson = req.query.json;
  var imgUrl = req.query.url;
  var imgWidth = req.query.width;
  var imgHeight = req.query.height;
  var imgDelay = req.query.delay;
  if (!req.query.url) {
    res.send("No Url Specified")
  } else {
    if (!imgWidth) {
      imgWidth = "1080";
    }
    if (!imgHeight) {
      imgHeight = "720";
    }
    if (!imgDelay) {
      imgDelay = "2";
    }
    var pageres = new Pageres({delay: parseInt(imgDelay)}).src(imgUrl, [imgWidth +
        "x" +
        imgHeight], {crop: false}).dest("./sites/").run().then(streams => {
      for (const stream of streams) {
        redirection(stream.filename);
      }
    });
  }
  function redirection(imgLocation) {
    if (imgJson == "true") {
      res.send(JSON.stringify({
        location: "/sites/" +
            imgLocation
      }));
    } else {
      res.sendFile(__dirname +
          "/sites/" +
          imgLocation);
    }
  }

});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " +
      listener.address().port);
});