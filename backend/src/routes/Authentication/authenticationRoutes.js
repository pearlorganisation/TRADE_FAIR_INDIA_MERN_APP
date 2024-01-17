const express = require("express");
const {
  login,
  refreshToken,
  logout,
  register,
  resetPassword,
  ema,
  emailVerify,
  signup,
  verifyEmail,
} = require("../../controllers/Authentication/authenticationControllers.js");
const { verifyToken } = require("../../middleware/verifyToken.js");
// ---------------------------------------------------------------------------------------------------------------

const router = express.Router();
const { upload } = require("../../configs/cloudinary.js");

router.route("/login").post(login);
router.route("/signup").post(upload.single("profilePic"), signup);

router.route("/refresh").post(refreshToken);

router.route("/logout").post(verifyToken, logout);

router.route("/resetPassword").put(resetPassword);
router.route("/verifyEmail/:token/:id").patch(verifyEmail);

module.exports = router;
