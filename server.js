var express = require('express');
var app = express();
app.use("/sites", express.static('sites'));
var Pageres = require('pageres');
app.get("/", function (req, res) {
  res.send('Okay');
});
app.get("/lense", function (req, res) {
  var imgName = Math.floor(100000000 +
    Math.random() * 900000000);
  var imgLocation = "/sites/" +
    imgName;
  var redirectToPng = req.query.redirect;
  var imgUrl = req.query.url;
  var imgWidth = req.query.width;
  var imgHeight = req.query.height;
  var imgCrop = req.query.crop;
  if (!req.query.url) {
    res.send('No Url Specified')
  }
  if (imgHeight && !imgWidth || imgWidth && !imgHeight) {
    res.send(JSON.stringify({
      error: "width and height must both be specified"
    }))
  }
  if (imgUrl && imgHeight && imgWidth && imgCrop == true) {
    var pageres = new Pageres({
      delay: 2,
      filename: imgName
    }).src(imgUrl, [imgWidth +
      'x' +
      imgHeight
    ], {
      crop: true
    }).dest('./sites/').run().then(() => console.log('done'));
    if (redirectToPng === true) {
      res.redirect(imgLocation);
    } else {
      res.send(JSON.stringify({
        location: imgLocation +
          '.png'
      }));
    }
  }
  if (imgUrl && imgHeight && imgWidth && (!imgCrop || imgCrop == false)) {
    var pageres = new Pageres({
      delay: 2,
      filename: imgName
    }).src(imgUrl, [imgWidth +
      'x' +
      imgHeight
    ], {
      crop: false
    }).dest('./sites/').run().then(() => console.log('done'));
    if (redirectToPng === true) {
      res.redirect(imgLocation);
    } else {
      res.send(JSON.stringify({
        location: imgLocation +
          '.png'
      }));
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' +
    listener.address().port);
});