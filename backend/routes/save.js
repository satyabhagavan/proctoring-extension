const router = require("express").Router();
// const base64 = require("base64image");
const fs = require("fs");

router.route("/save").post((req, res) => {
  const img64 = req.body.img;
  const fileName = req.body.fileName;

  var options = { filename: fileName, filePath: "./pics/" };
  var imageData = new Buffer(img64, "base64");

  fs.writeFile("./pics/" + fileName, imageData, (err) => {});

  //   base64.base64decoder(imageData, options, function (err, saved) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(saved);
  //   });

  res.status(200).json({
    message: "Saving image",
  });
});

module.exports = router;
