const ShopRegistration = require("../models/ShopRegistration");

exports.checkRole = () => {
  try {
    return async (req, res, next) => {
      // let vendorCheck = false;

      // if (
      //   (req?.userCredentials?.role && req.userCredentials?.role == "ADMIN") ||
      //   req.userCredentials?.role == "SUPER_ADMIN" ||
      //   vendorCheck
      // ) {
      // }
      return next();

      // res.status(403).json({ status: false, message: "Access denied!!" });
    };
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal Server Error",
    });
  }
};
