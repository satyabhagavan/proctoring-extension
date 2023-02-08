const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  testsTaken: [
    {
      TestId: {
        type: Types.ObjectId,
      },
      dateOfTestTaken: {
        type: String,
      },
    },
  ],
});

const users = model("users", userSchema);

module.exports = users;
