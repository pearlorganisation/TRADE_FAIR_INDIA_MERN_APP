const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    expiresAt: {
      type: Date,
      // required:[true,"Expiry Date of otp must be provided"]
    },
  },
  { timestamps: true, expireAfterSeconds: 10 }
);

// otpSchema.index({ expire_at: 1 }, { expireAfterSeconds: 2 });

const otpModel = mongoose.model("OTP", otpSchema, "otp");
// Create an index on the expiresAt field for automatic document expiration
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3 });

module.exports = { otpModel };
