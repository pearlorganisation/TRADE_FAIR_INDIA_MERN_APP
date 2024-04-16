// ------------------------------------------Imports---------------------------------------------------------
const authModel = require("../../models/Authentication/authenticationModel.js");
// const sendToken=require("../")
const shopOwner = require("../../models/Authentication/ownerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { saveAccessTokenToCookie } = require("../../utils/index.js");
const {
  accessTokenValidity,
  refreshTokenValidity,
} = require("../../utils/index.js");
const { sendTokenMail } = require("../../utils/sendTokenMail.js");
const roleModel = require("../../models/Authentication/roles.js");
// -----------------------------------------------------------------------------------------------------------

// @desc - to fetch the users data
// @route - GET /auth/login
// @access - PUBLIC
exports.login = async (req, res) => {
  try {
    const { username, password, type } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await authModel
      .findOne({ $or: [{ email: username }] })
      .populate("permissions", ["permission", "_id"])
      // .populate("role", ["role", "_id"])
      .select("-__v");

    if (type === "CLIENT" && user?.role?.role !== "USER") {
      return res.status(400).json({
        status: "FALIURE",
        message: "Only user can log in client panel!!",
      });
    }

    if (type === "ADMIN" && user?.role?.role === "USER") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Only vendor and admin can login in admin panel !! ",
      });
    }

    if (type === "CLIENT" && !user?.emailVerified) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Please verify your email first!!",
      });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Username/Email does not exists" });
    }

    if (user?.isUserActivate == "Deactivate") {
      return res.status(400).json({
        status: false,
        message:
          "This user is deactivated. Please contact Trade Fair India Administrators to activate this account.",
      });
    }
    let permissionArray = [];
    Array.isArray(user?.permissions) &&
      user?.permissions.length >= 1 &&
      user?.permissions?.forEach((item) => {
        permissionArray.push(item?.permission);
      });

    //matching password using bcrypt
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessTokenValidity }
    );

    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        userId: user._id,
        email: user?.email,
        name: user?.name,
        permissions: permissionArray,
        role: user?.role,
        profilePic: user?.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await authModel.create({ ...req?.body });

    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ status: false, message: err?.message });
  }
};

// @desc - to generate a new refresh token
// @route - POST /auth/refresh
// @access - PUBLIC
exports.refreshToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email ID is required to generate Refresh Token",
      });
    }

    const user = await authModel.findOne({ email });
    const ownerUser = await shopOwner.findOne({ email });

    if (!user && !ownerUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Does Not Exists" });
    }

    // clearing the existing cookie
    res.clearCookie("ACCESS_TOKEN");

    // refreshToken - generating a new refresh token with extended time
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: refreshTokenValidity }
    );

    // Saving refreshToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Refresh Token Generated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// @desc - to fetch the users data
// @route - POST /auth/logout
// @access - PUBLIC
exports.logout = async (req, res) => {
  try {
    res.clearCookie("TFI_ACCESS_TOKEN");
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - to update the users password
// @route - PUT /auth/resetPassword
// @access - PRIVATE
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "FAILURE",
        status: "Email Id, Password and Confirm Password are required",
      });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exists" });
    }

    if (password.length < 10 || confirmPassword.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password must have length greater than or equal to 10",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { $new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc -signup for client panel
// @route - POST /auth/signup
exports.signup = async (req, res) => {
  try {
    const { password, email, name } = req?.body;
    const isUserExists = await authModel.findOne({ email });

    if (req?.file && req?.file?.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        status: "FAILURE",
        message: "profile pic size must be smaller than 2MB",
      });
    }

    const role = await roleModel.findOne({ role: "USER" });
    const hashPassword = await bcrypt.hash(req?.body?.password, 10);

    let existingPermissions = [];
    role &&
      role?.permissions?.forEach((item) => {
        existingPermissions.push({
          _id: item?._id,
          permission: item?.permission,
        });
      });
    const savedUser = await authModel.create({
      name,
      email,
      permissions: existingPermissions,
      password: hashPassword,
      role: role?._id,
    });

    const url =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_LIVE_URL
        : process.env.FRONTEND_LOCAL_URL;

    const token = jwt.sign({}, process.env.VERIFY_EMAIL_SECRET, {
      expiresIn: "5m",
    });

    const finalUrl = `${url}${token}/${savedUser?._id}`;

    sendTokenMail(savedUser?.email, finalUrl, savedUser?.name).then((data) => {
      setTimeout(async () => {
        await authModel.findByIdAndDelete(id);
      }, 300000);

      res.status(200).json({
        status: "SUCCESS",
        message: "please open the url,sent in your mail",
        data: savedUser,
      });
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};

// @desc - to verify user email and update email verify key
// @route - PATCH /auth/emailVerify
exports.verifyEmail = async (req, res) => {
  try {
    const { token, id } = req?.params;

    const isValidToken = await jwt.verify(
      token,
      process.env.VERIFY_EMAIL_SECRET
    );

    const isValidUserId = await authModel.findById(id);

    if (!isValidToken || !isValidUserId) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Email not verified/Invalid token",
      });
    }
    await authModel.findByIdAndUpdate(id, { emailVerified: true });
    res.status(200).json({ status: "SUCCESS", message: "EMAIL VERIFIED" });
  } catch (e) {
    res.status(400).json({
      status: "SUCCESS",
      message: `${e?.message} -Invalid Email!!`,
    });
  }
};
