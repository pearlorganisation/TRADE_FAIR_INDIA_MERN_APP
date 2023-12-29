const mongoose = require("mongoose");
const eventCategory = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "eventCategory",
  eventCategory,
  "eventCategory"
);
