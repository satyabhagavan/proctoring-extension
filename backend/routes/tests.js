const router = require("express").Router();

router.route("/").get((req, res) => {
  res.status(200).json({
    message: "tests retrived successfully",
  });
});

router.route("/create").post((req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "test created successfully" });
});

module.exports = router;
