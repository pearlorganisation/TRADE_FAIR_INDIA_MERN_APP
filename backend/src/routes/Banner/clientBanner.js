const { upload } = require("../../configs/cloudinary");

const express = require("express");

const {
  newClientBanner,
  getBanner,
  updateBanner,
  deleteClientBanner,
} = require("../../controllers/Banner/clientBanner");
const router = express.Router();

router.route("/").post(upload.single("banner"), newClientBanner).get(getBanner);
router
  .route("/:id")
  .patch(upload.single("banner"), updateBanner)
  .delete(deleteClientBanner);
module.exports = router;
