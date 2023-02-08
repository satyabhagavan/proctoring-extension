const router = require("express").Router();
const Tests = require("../models/Tests.js");

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

module.exports = router;
