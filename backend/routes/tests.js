const router = require("express").Router();
const Tests = require("../models/Tests.js");
const Users = require("../models/Users.js");
const fs = require("fs");
const path = require("path");

router.route("/").get((req, res) => {
  res.status(200).json({
    message: "tests retrived successfully",
  });
});

router.route("/create").post((req, res) => {
  if (req.body.endTime == null || req.body.endTime == undefined) {
    req.body.endTime = null;
  }

  const test = new Tests({
    name: req.body.name,
    testCode: req.body.code,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  });

  test.save((err) => {
    if (err) {
      if (err.code === 11000) {
        res
          .status(400)
          .json({ message: "testCode is already exits create a new one" });
      } else {
        res.status(400).json({ message: "error in creating test" });
      }
    } else {
      res.status(201).json({ message: "test created successfully" });
    }
  });
});

router.route("/allTests").get((req, res) => {
  Tests.find({}, (err, tests) => {
    if (err) {
      res.status(400).json({
        message: "error in retriving information",
      });
    } else {
      res.status(200).json({
        message: "tests information retrived",
        tests,
      });
    }
  });
});

router.route("/info/:id").get(async (req, res) => {
  try {
    let test = await Tests.findOne({ testCode: req.params.id });
    if (test) {
      let users = test.users;

      let UsersInfo = [];

      for (let temp of users) {
        const tempUser = await Users.findById(temp.userId);
        const tempU = {
          userId: temp.userId,
          status: temp.status,
          name: tempUser.name,
          email: tempUser.email,
        };

        UsersInfo.push(tempU);
      }

      test.users = UsersInfo;

      res.status(200).json({
        statusCode: 200,
        test,
        UsersInfo,
        message: "test found successfully",
      });
    } else {
      res.status(200).json({ statusCode: 404, message: "test not found" });
    }
  } catch (err) {
    res.status(200).json({ statusCode: 500, message: err.message });
  }
});

router.route("/:id/user/:email").get(async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.email);
  const testCode = req.params.id;
  const email = req.params.email;

  const baseFolder =
    "E:\\internship\\tasks\\eLitmus\\frontend\\admin-panel\\public\\storage";
  let userFolder = baseFolder;
  userFolder = userFolder + `\\${testCode}\\${email}`;

  fs.readdir(userFolder, (error, files) => {
    if (error) {
      console.error(`Error reading folder: ${error}`);
      return res.status(400).json({ message: "Error reading folder" });
    } else {
      let listOfFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === ".jpg"
      );

      return res
        .status(200)
        .json({ message: "files retrived successfully", listOfFiles });
    }
  });
});

module.exports = router;
