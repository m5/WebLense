var express = require('express');
var app = express();
app.use("/sites", express.static('sites'));
const Pageres = require('pageres');
app.get("/", function (req, res) {
  res.send('Okay');
});
app.get("/lense", function (req, res) {
  var imgName = Math.floor(100000000 + Math.random() * 900000000) + ".png";
  var imgLocation = "/sites/" + imgName;
  var redirectToPng = req.query.redirect;
  if (req.query.url) {
    var imgUrl = req.query.url;
  };
  if (req.query.width) {
    var imgWidth = req.query.width;
  };
  if (req.query.height) {
    var imgHeight = req.query.height;
  };
  if (req.query.crop) {
    var imgCrop = req.query.crop;
  };
  if (!req.query.url) {
    res.send('No Url Specified')
  };
  if (imgHeight && !imgWidth || imgWidth && !imgHeight) {
    res.send(JSON.stringify({
      error: "width and height must both be specified"
    }))
  };
  if (imgUrl && imgHeight && imgWidth && imgCrop == true) {
    const pageres = new Pageres({
      delay: 2,
      filename: imgName
    }).src(imgUrl, [imgWidth + 'x' + imgHeight], {
      crop: true
    }).dest('./sites/')
    .run()
    .then(() => console.log('done'));
        if (redirectToPng === true){
      res.redirect(imgLocation);
    } else {
      res.send(JSON.stringify({location: imgLocation}));
    }
  }
  if (imgUrl && imgHeight && imgWidth && (!imgCrop || imgCrop == false)) {
    const pageres = new Pageres({
      delay: 2,
      filename: imgName
    }).src(imgUrl, [imgWidth + 'x' + imgHeight], {
      crop: false
    }).dest('./sites/')
    .run()
    .then(() => console.log('done'));
    if (redirectToPng === true){
      res.redirect(imgLocation);
    } else {
      res.send(JSON.stringify({location: imgLocation}));
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' +
    listener.address().port);
});