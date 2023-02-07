const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  books: [
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

const user = model("user", userSchema);
