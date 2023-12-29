const express = require("express");
const {
  createNewFaq,
  getAllFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faq");
const router = express.Router();

router.route("/").post(createNewFaq).get(getAllFaq);
router.route("/:id").patch(updateFaq).delete(deleteFaq);
module.exports = router;
