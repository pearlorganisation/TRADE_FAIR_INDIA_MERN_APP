const { upload } = require("../../configs/cloudinary");

const express = require("express");
const {
  newClientSubBanner,
  getSubBanner,
  updateSubBanner,
  deleteSubClientBanner,
} = require("../../controllers/Banner/clientSubBanner");
const router = express.Router();

router
  .route("/")
  .post(upload.single("banner"), newClientSubBanner)
  .get(getSubBanner);
router
  .route("/:id")
  .patch(upload.single("banner"), updateSubBanner)
  .delete(deleteSubClientBanner);
module.exports = router;
