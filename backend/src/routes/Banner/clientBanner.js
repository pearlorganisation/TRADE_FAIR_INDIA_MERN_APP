const { upload } = require("../../configs/cloudinary");

const express = require("express");

const {
  newClientBanner,
  getBanner,
  updateBanner,
  deleteClientBanner,
} = require("../../controllers/Banner/clientBanner");
const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{ name: "banner" }, { name: "mobileBanner" }]),
    newClientBanner
  )
  .get(getBanner);
router
  .route("/:id")
  .patch(
    upload.fields([{ name: "banner" }, { name: "mobileBanner" }]),
    updateBanner
  )
  .delete(deleteClientBanner);
module.exports = router;
