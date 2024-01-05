const mongoose = require("mongoose");
const eventBanner = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
    },
    bannerData: {
      required: true,
      type: String,
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventBanner", eventBanner, "eventBanner");
