const fs = require("fs");

const baseFolder = "E:\\internship\\tasks\\eLitmus\\storage";

let testId = "satya1";
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
    console.log(`Folder exists`);
  } else {
    console.error(`${testFolder} is not a folder`);
  }
});

let email = "user1@gmail.com";
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
    console.log(`Folder exists`);
  } else {
    console.error(`${userFolder} is not a folder`);
  }
});
