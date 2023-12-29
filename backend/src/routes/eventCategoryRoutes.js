const express = require("express");
const {
  getAllEventCategory,
  updateEventCategory,
  deleteEventCategory,
  createEventCategory,
} = require("../controllers/eventCategory");
const router = express.Router();
router.route("/").get(getAllEventCategory).post(createEventCategory);
router.route("/:id").patch(updateEventCategory).delete(deleteEventCategory);
module.exports = router;
