const router = require("express").Router();
const UsersModel = require("../models/Users.js");

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
  // console.log(req.body);
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

module.exports = router;
