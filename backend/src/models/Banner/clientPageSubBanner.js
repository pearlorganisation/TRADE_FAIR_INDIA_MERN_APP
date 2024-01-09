const mongoose = require("mongoose");
const subBanner = new mongoose.Schema(
  {
    banner: {
      type: String,
      //   required: true,
    },
    bannerData: {
      type: String,
      //   required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    buttonLink: {
      type: String,
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subBanner", subBanner, "subBanner");
