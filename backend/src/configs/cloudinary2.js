const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "Trade-Fair-India",
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = { upload };

// ------------------------------------------------------------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Nitish_LMS", // Here, This is the cloudinary folder name which will be use for cloudinary storage.
    public_id: (req, file) => {
      // File Name for Cloudinary which will come with url also.
      return `${
        file?.originalname ? file?.originalname : "Trade-Fair-India"
      }-${new Date().getTime()}`;
    },
  },
});

module.exports = { storage };
