const express = require("express");
const {
  newListUrl,
  getAllUrl,
  updateListUrl,
} = require("../controllers/listYourEvent");
const router = express.Router();
router.route("/:id").post(newListUrl).get(getAllUrl).put(updateListUrl);
module.exports = router;
