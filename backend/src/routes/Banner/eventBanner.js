const express = require("express");
const {
  getEventBanner,
  createEventBanner,
  updateEventBanner,
  deleteEventBanner,
} = require("../../controllers/Banner/eventBanner");

const { upload } = require("../../configs/cloudinary");
const router = express.Router();

router
  .route("/")
  .get(getEventBanner)
  .post(upload.single("banner"), createEventBanner);
router
  .route("/:id")
  .patch(upload.single("banner"), updateEventBanner)
  .delete(deleteEventBanner);

module.exports = router;
