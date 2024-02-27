const express = require("express");
const { newListUrl, getAllUrl } = require("../controllers/listYourEvent");
const router = express.Router();
router.route("/").post(newListUrl).get(getAllUrl);
module.exports = router;
