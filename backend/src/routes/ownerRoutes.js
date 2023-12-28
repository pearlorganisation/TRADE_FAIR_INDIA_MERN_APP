const express = require("express");
const {
  ownerLogin,
  ownerShops,
  ownerSendOtp,
  ownerResetPassword,
  ownerVerifyOtp,
} = require("../controllers/Authentication/ownerController");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser");
const router = express.Router();

router.route("/login").post(ownerLogin);
router.route("/ownerSendOtp").post(ownerSendOtp);
router.route("/shop/:email").get(ownerShops);
router.route("/ownerVerifyOtp").post(ownerVerifyOtp);
router.route("/ownerResetPassword").patch(ownerResetPassword);

module.exports = router;
