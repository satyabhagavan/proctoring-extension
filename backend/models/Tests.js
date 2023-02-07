const { Schema, model, Types } = require("mongoose");

const testSchema = new Schema({
  name: {
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
    required: true,
  },
});

const user = model("user", testSchema);
