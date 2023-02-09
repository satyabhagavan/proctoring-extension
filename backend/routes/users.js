const router = require("express").Router();
const UsersModel = require("../models/Users.js");
const TestsModel = require("../models/Tests.js");

router.route("/").get((req, res) => {
  res.status(200).json({
    message: "users retrived successfully",
  });
});

router.route("/register").post((req, res) => {
  if (req.body.isAdmin == null || req.body.isAdmin == undefined) {
    req.body.isAdmin = false;
  }

  const newUser = new UsersModel({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  console.log(newUser);
  newUser.save((err) => {
    if (err) {
      if (err.code === 11000) {
        res
          .status(400)
          .json({ message: "email is already exits create a new one" });
      } else {
        console.log(err);
        res.status(400).json({ message: "error in creating user" });
      }
    } else {
      res.status(201).json({ message: "User created successfully" });
    }
  });
});

router.route("/login").post(async (req, res) => {
  if (req.body.email == null || req.body.email == undefined) {
    return res.status(400).json({ message: "email is required" });
  }
  if (req.body.password == null || req.body.password == undefined) {
    return res.status(400).json({ message: "password is required" });
  }

  const user = await UsersModel.findOne({ email: req.body.email });

  if (user == null) {
    return res.status(400).json({ message: "email doesn't exists" });
  }

  if (user.password == req.body.password) {
    return res.status(200).json({
      userId: user._id,
      isAdmin: user.isAdmin,
      message: "login successful",
    });
  } else {
    return res.status(400).json({ message: "incorrect password" });
  }
});

router.route("/getDetails").post(async (req, res) => {
  const user = await UsersModel.findOne({ _id: req.body.userId });
  const { password, ...otherDetails } = user._doc;
  res.status(200).json(otherDetails);
});

router.route("/takeTest").post(async (req, res) => {
  // find the user and test
  const test = await TestsModel.findOne({ testCode: req.body.testCode });
  const user = await UsersModel.findOne({ email: req.body.email });

  if (test == null) {
    return res
      .status(400)
      .json({ message: "no test exists with the test code" });
  }
  if (user == null) {
    return res
      .status(400)
      .json({ message: "no user exists with the email id" });
  }

  // have to update both the user and tests collection
  // updating in user
  let testsTaken = user.testsTaken;

  // user already took test or not
  let already = false;
  testsTaken.map((each) => {
    if (each.TestId.toString() == test._id.toString()) {
      already = true;
    }
  });

  if (already) {
    return res.status(400).json({ message: "user already took exam" });
  }

  testsTaken.push({
    TestId: test._id,
    dateOfTestTaken: Date.now(),
    status: "Started",
  });

  user.testsTaken = testsTaken;
  user.save((error) => {
    if (error) {
      return res.status(400).json({ message: "error in taking the exam" });
    } else {
      //now check and add the same details to the test
    }
  });

  let usersTaken = test.users;
  usersTaken.push({
    userId: user._id,
    status: "Started",
  });

  test.users = usersTaken;
  test.save((error) => {
    if (error) {
      return res.status(400).json({ message: "error in taking exam" });
    } else {
      return res.status(200).json({ message: "please proceed with the exam" });
    }
  });
});

router.route("/endTest").post(async (req, res) => {
  const test = await TestsModel.findOne({ testCode: req.body.testCode });
  const user = await UsersModel.findOne({ email: req.body.email });

  if (test == null) {
    return res
      .status(400)
      .json({ message: "no test exists with the test code" });
  }
  if (user == null) {
    return res
      .status(400)
      .json({ message: "no user exists with the email id" });
  }

  let testsTaken = user.testsTaken;

  for (let i = 0; i < testsTaken.length; i++) {
    let temp = testsTaken[i];
    if (temp.TestId.toString() == test._id.toString()) {
      temp.status = "Completed";
    }
    testsTaken[i] = temp;
  }

  user.testsTaken = testsTaken;
  user.save((error) => {
    if (error) {
      return res.status(400).json({ message: "error in ending the exam" });
    } else {
      //now check and add the same details to the test
    }
  });

  //updating tests
  let usersTaken = test.users;

  for (let i = 0; i < usersTaken.length; i++) {
    let temp = usersTaken[i];
    if (temp.userId.toString() == user._id.toString()) {
      temp.status = "Completed";
    }
    usersTaken[i] = temp;
  }

  test.users = usersTaken;

  test.save((error) => {
    if (error) {
      return res.status(400).json({ message: "error in ending the exam" });
    } else {
      return res.status(200).json({ message: "see you on the results" });
    }
  });
});

module.exports = router;
