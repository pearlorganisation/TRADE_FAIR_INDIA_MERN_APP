const mongoose = require("mongoose");
let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    profilePic: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FProfessional-Cartoon-Profile-Portfolio-Picture%2Fdp%2FB07H7G6ZX9&psig=AOvVaw14kv_zmOJkHivWfg705_-d&ust=1697704834666000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCe7sCZ_4EDFQAAAAAdAAAAABAH",
    },
    password: String,
    permissions: {
      type: [],
      required: false,
    }, // Required field },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: "role",
      enum: ["ADMIN", "VENDOR", "USER", "SUPER_ADMIN"],
    },
    isUserActivate: {
      type: String,
      enum: ["Activate", "Deactivate"],
      default: "Activate",
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "auth" },
    createdAtTime: String,
    createdAtDate: String,
  },
  { timestamps: true }
);

const authModel = mongoose.model("auth", authSchema, "auth");
module.exports = authModel;
