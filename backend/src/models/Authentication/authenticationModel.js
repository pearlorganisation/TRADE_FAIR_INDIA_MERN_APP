const mongoose = require("mongoose");
let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists!!"],
    },
    profilePic: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FProfessional-Cartoon-Profile-Portfolio-Picture%2Fdp%2FB07H7G6ZX9&psig=AOvVaw14kv_zmOJkHivWfg705_-d&ust=1697704834666000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCe7sCZ_4EDFQAAAAAdAAAAABAH",
    },
    password: String,

    role: {
      type: String,
      ref: "role",
      enum: ["USER", "SUPER_ADMIN"],
      default: "USER",
    },
    isUserActivate: {
      type: String,
      enum: ["Activate", "Deactivate"],
      default: "Activate",
    },
    permissions: {
      type: [mongoose.Schema.ObjectId],
      ref: "permission",
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "admin-client-auth" },
    createdAtTime: String,
    createdAtDate: String,
  },
  { timestamps: true }
);

const authModel = mongoose.model(
  "admin-client-auth",
  authSchema,
  "admin-client-auth"
);
module.exports = authModel;
