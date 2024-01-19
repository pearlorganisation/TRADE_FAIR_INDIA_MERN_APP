const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role field is required"],
    },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "admin-client-auth" },

    permissions: {
      type: [mongoose.Schema.ObjectId],
      ref: "permission",
    },
  },
  { timestamps: true }
);

const roleModel = mongoose.model("role", roleSchema);

module.exports = roleModel;
