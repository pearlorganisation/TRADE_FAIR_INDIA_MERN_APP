// =====================================================imports==============================================
const multer = require("multer");
const { storage } = require("../configs/cloudinary2.js");
// **********************************************************************************************************

//upload -- variable calling the multer constructor and setting the multer configuration
const upload = multer({
  storage: storage,
});

module.exports = { upload };
