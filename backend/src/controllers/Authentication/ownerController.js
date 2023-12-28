const Vendor = require("../../models/Authentication/ownerSchema");
const cryptoJs = require("crypto-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Shop = require("../../models/ShopRegistration");
const {
  generatePassword,
  saveAccessTokenToCookie,
  generateOtp,
} = require("../../utils");
const ShopRegistration = require("../../models/ShopRegistration");
const { sendMail } = require("../../utils/sendMail");
const { otpModel } = require("../../models/Authentication/otp");
const authModel = require("../../models/Authentication/authenticationModel");
const ownerModel = require("../../models/Authentication/ownerSchema");

// @desc  signup for owner
// @route   Get /api/v1/owner/signup
exports.ownerSignup = async (req, res, next) => {
  try {
    const { emailAddress } = req?.body;
    let existingUser = await Vendor.findOne({ email: emailAddress });

    if (existingUser) {
      req.email = emailAddress;
      req.password = existingUser?.password;

      return next();
    }

    let initialPassword = generatePassword();

    let initialData = new Vendor({
      email: emailAddress,
      password: initialPassword,
    });
    const savedData = await initialData.save();

    req.email = req.body?.emailAddress;
    req.password = initialPassword;

    next();
  } catch (err) {
    return res.status(200).json({
      status: "SUCCESS",
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  owner login
// @route   Get /api/v1/owner/login
exports.ownerLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    let existingData = await Vendor.findOne({ email });

    if (!existingData) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No user found with given email" });
    }
    let matchPassword = existingData?.password === password;
    if (!matchPassword) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Invalid Password!!" });
    }

    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: existingData._id,
        email: existingData?.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );

    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);
    res.status(200).json({
      status: "SUCCESS",
      message: "login successfully",
      data: existingData,
    });
  } catch (err) {
    return res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  Get shop owner's shop
// @route   Get /api/v1/owner/shop/:email
exports.ownerShops = async (req, res) => {
  try {
    let Shop = await ShopRegistration.find({
      emailAddress: req?.params?.email,
    })
      .populate("enquiries")
      .populate("events");
    res.status(200).json({ status: "SUCCESS", Data: Shop });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  send otp for reset password
// @route   Get /api/v1/owner/ownerSendOtp
exports.ownerSendOtp = async (req, res) => {
  try {
    const { email } = req?.body;
    const isUserExist = await Vendor.findOne({ email });

    if (!isUserExist) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No user exist with given email!!",
      });
    }

    let otp = generateOtp();
    sendMail(email, otp).then(async () => {
      await await otpModel.create({ otp });
      res
        .status(200)
        .json({ status: "SUCCESS", message: "OTP sent successfully!!",email  });
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error!! ",
    });
  }
};

// @desc  for verify otp
// @route   Get /api/v1/owner/ownerVerifyOtp
exports.ownerVerifyOtp = async (req, res) => {
  try {
    const { otp } = req?.body;
    const isOtpMatched = await otpModel.findOne({ otp });
    if (!isOtpMatched) {
      return res.status(400).json({
        status: "SUCCESS",
        message: "Invalid Otp- Please try again!!",
      });
    }
    res.status(200).json({ status: "SUCCESS", message: "OTP-MATCHED!!" });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc  for reset owner password
// @route   Get /api/v1/owner/ownerResetPassword
exports.ownerResetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req?.body;

    if (password != confirmPassword) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Password and confirm password not matched!!",
      });
    }

    // const encryptedPassword = await bcrypt.hash(password, 10);
    await ownerModel.updateOne({ email }, { password });
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Password changed successfully!!" });
  } catch (err) {
    res.sttaus(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};
