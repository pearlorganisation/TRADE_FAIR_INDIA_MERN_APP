const mongoose = require("mongoose");
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const jwt = require("jsonwebtoken");
const ownerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!!"],
    },
    mobileNumber: {
      type: String,
      reuired: [true, "Mobile number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ownerModel = mongoose.model("owner-auth", ownerSchema, "owner-auth");
module.exports = ownerModel;
