const mongoose = require("mongoose");

const listYourEvent = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Url is required"],
    },
  },
  { timestamps: true }
);

const eventUrl = mongoose.model("eventUrl", listYourEvent, "eventUrl");
module.exports = eventUrl;
