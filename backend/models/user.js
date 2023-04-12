require("dotenv");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name mandatorily required"],
    maxlength: [50, "Name exceed 50 characters"],
    minlength: [3, "Name must be minimum of 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email mandatorily required"],
    unique: [true, "Email already exists"],
    validate: [validator.isEmail, "Provide a correct email address"],
  },
  password: {
    type: String,
    required: [true, "Password mandatorily required"],
    minlength: [4, "Password must be minimum 4 characters"],
    select: false,
  },
  mobile: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hashSync(this.password, 10);
});

userSchema.methods.isValidatedPassword = async function (passpassword) {
  return await bcrypt.compare(passpassword, this.password);
};

userSchema.methods.jwtTokenization = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
