const express = require("express");
const {
  newListUrl,
  getAllUrl,
  updateListUrl,
  deleteListYourEvent,
} = require("../controllers/listYourEvent");
const router = express.Router();
router.route("/").post(newListUrl).get(getAllUrl);
router.route("/:id").put(updateListUrl).delete(deleteListYourEvent);
module.exports = router;
