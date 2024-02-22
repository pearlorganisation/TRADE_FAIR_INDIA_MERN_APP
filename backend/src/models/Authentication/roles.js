const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role field is required"],
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "admin-client-auth" },
  },
  { timestamps: true }
);

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;
