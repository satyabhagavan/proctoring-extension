const { Schema, model, Types } = require("mongoose");

const testSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  testCode: {
    type: String,
    required: true,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: false,
  },
});

const test = model("test", testSchema);

module.exports = test;
