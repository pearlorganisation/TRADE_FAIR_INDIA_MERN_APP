const mongoose = require("mongoose");

const clientBannerSchema = new mongoose.Schema(
  {
    banner: { type: String, required: [true, "Banner image is required!!"] },
    mobileBanner: {
      type: String,
      // required: [true, "Mobile banner image is required!!"],
    },
    bannerData: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },

    buttonLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "clientBanner",
  clientBannerSchema,
  "clientBanner"
);
