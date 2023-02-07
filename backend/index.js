const express = require("express");
require("dotenv").config();
let bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static("public"));

const uri = process.env.MONGODB_URL;
mongoose.set("strictQuery", true);
mongoose.connect(uri);

// checking the connection to the db
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRoutes = require("./routes/users");
const testsRoutes = require("./routes/tests");

app.use("/users/", userRoutes);
app.use("/tests/", testsRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
