// @imports-section
const {
  getEvent,
  createEvent,
  deleteEvent,
  getSingleEvent,
  updateEvent,
} = require("../controllers/eventController.js");

const { upload } = require("../configs/cloudinary.js");

const express = require("express");
const { verifyUserTokenMiddleware } = require("../middleware/verifyUser.js");
const { checkRole } = require("../middleware/roleCheck.js");

const router = express.Router();

router
  .route("/")
  .get(getEvent)
  .post(
    verifyUserTokenMiddleware,
    checkRole(),
    upload.fields([
      { name: "eventBanner" },
      { name: "shopGalleries" },
      { name: "eventBrochure", maxCount: 3 },
      { name: "eventLogo", maxCount: 1 },
    ]),
    createEvent
  );

router
  .route("/:id")
  .delete(verifyUserTokenMiddleware, checkRole(), deleteEvent)
  .put(
    upload.fields([
      { name: "shopGalleries" },
      { name: "eventBrochure", maxCount: 3 },
      { name: "eventLogo" },
      { name: "eventBanner" },
    ]),
    updateEvent
  )
  .get(getSingleEvent);

module.exports = router;
