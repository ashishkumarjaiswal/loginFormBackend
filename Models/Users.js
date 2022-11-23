const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: [true, "Email already exist"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [8, "password must be atleast 8 character"],
  },

  mobileNumber: {
    type: Number,
    required: true,
    minLength: [10, "password must be 10 character"],
  },

  name: {
    type: String,
    required: true,
  },

  place: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
