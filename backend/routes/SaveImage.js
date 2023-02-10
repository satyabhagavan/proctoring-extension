const router = require("express").Router();
const fs = require("fs");

router.route("/save").post((req, res) => {
  const baseFolder = "E:\\internship\\tasks\\eLitmus\\storage";

  let testId = req.body.testCode;
  const testFolder = baseFolder + `\\${testId}`;

  fs.stat(testFolder, (error, stats) => {
    if (error) {
      console.error(`Folder does not exist`);
      fs.mkdir(testFolder, { recursive: true }, (error) => {
        if (error) {
          console.error(`Error creating folder: ${error}`);
        } else {
          console.log(`Folder created: ${testFolder}`);
        }
      });
    } else if (stats.isDirectory()) {
      // folder exists
    } else {
      console.error(`${testFolder} is not a folder`);
    }
  });

  let email = req.body.email;
  const userFolder = testFolder + `\\${email}`;

  fs.stat(userFolder, (error, stats) => {
    if (error) {
      console.error(`Folder does not exist`);
      fs.mkdir(userFolder, { recursive: true }, (error) => {
        if (error) {
          console.error(`Error creating folder: ${error}`);
        } else {
          console.log(`Folder created: ${userFolder}`);
        }
      });
    } else if (stats.isDirectory()) {
      // folder exists
    } else {
      console.error(`${userFolder} is not a folder`);
    }
  });

  const img64 = req.body.img;
  const fileName = Date.now() + ".jpg";

  const imageData = new Buffer(img64, "base64");

  fs.writeFile(userFolder + "\\" + fileName, imageData, (err) => {});

  res.status(200).json({
    message: "Saving image",
  });
});

module.exports = router;
