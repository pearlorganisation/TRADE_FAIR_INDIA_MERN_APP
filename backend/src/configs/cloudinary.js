const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

console.log(
  process.env.CLOUDINARY_API_SECRET,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_CLOUD_NAME
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({ storage: storage });

module.exports = { upload, cloudinary };
