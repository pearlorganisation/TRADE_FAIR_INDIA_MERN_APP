const User = require("../models/Authentication/authenticationModel");
const bcrypt = require("bcrypt");
const { nameRegex, passwordRegex, emailRegex } = require("../utils/regex");
const permissionModel = require("../models/Authentication/permissions");
const roleModel = require("../models/Authentication/roles");
const { cloudinary } = require("../configs/cloudinary");

// @desc  Get users
// @route   Get /api/v1/users
exports.viewUsers = async (req, res) => {
  const { Page, Limit, Search } = req.query;
  console.log(Limit);
  let page = 1;
  let limit = 10;
  let search = "";

  if (Page) {
    page = Math.max(page, Page);
  }
  if (Limit) {
    limit = Math.max(limit, Limit);
  }
  if (Search) {
    search = Search;
  }

  let skip = (page - 1) * limit;
  try {
    const totalDocuments = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    if (Limit === "infinite") {
      limit = totalDocuments;
    }
    const totalPage = Math.ceil(totalDocuments / limit);
    const existingUsers = await User.find({
      name: { $regex: search, $options: "i" },
      emailVerified: true,
    })
      .populate("permissions", ["permission", "_id"])
      // .populate("role", ["role", "_id"])
      .populate("createdBy")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = existingUsers?.length;

    res.status(200).json({
      status: "SUCCESS",
      data: existingUsers,
      total,
      totalDocuments,
      totalPage,
      message: `Data Found Successfully`,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  update users
// @route   patch /api/v1/users
exports.updateUsers = async (req, res) => {
  try {
    const { password, email, name, permissions } = req?.body;
    let updatedPermission;
    if (permissions) {
      updatedPermission = JSON.parse(permissions);
    }
    const existingUser = await User.findById(req?.params?.id);

    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No user found with given Id" });
    }

    if (req?.file) {
      let publicId = existingUser?.profilePic?.split("/").pop().split(".")[0];

      cloudinary.uploader.destroy(publicId, (e) => {
        if (e) {
          return res.status(400).json({ status: "FAILURE", message: e });
        }
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req?.params?.id, {
      createdBy: req?.body?.createdBy,
      name: req?.body?.name,
      profilePic: req?.file?.path || existingUser?.profilePic,
      permissions: updatedPermission,
      role: req?.body?.role,
    });
    res.status(200).json({
      status: "SUCCESS",
      message: "User Updated Successfully",
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .json({ status: 400, message: err?.message || "Internal Server Error" });
  }
};

// @desc  delete users
// @route   delete /api/v1/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req?.params?.id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No user found with given Id" });
    }

    const userRole = await roleModel.findOne({ role: existingUser?.role });

    if (
      userRole?.role == "SUPER_ADMIN" &&
      existingUser?.isUserActivate == "Activate"
    ) {
      return res.status(400).json({
        status: "FAILURE",
        message: "You are not allowed to delete active Super Admin",
      });
    }

    let publicId = existingUser?.profilePic?.split("/").pop().split(".")[0];
    cloudinary.uploader.destroy(publicId, (e) => {
      if (e) {
        return res.status(400).json({ status: "FAILURE", message: e });
      }
    });

    await User.findByIdAndDelete(req?.params?.id);
    res
      .status(200)
      .json({ status: "SUCCESS", message: "User Deleted Successfully!!" });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  get single users
// @route   single /api/v1/users/:id
exports.viewSingleUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req?.params?.id);
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No user found with given Id" });
    }
    res.status(200).json({
      status: "SUCCESS",
      data: existingUser,
      message: "Data Found Successfully",
    });
  } catch (err) {
    res.status(200).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  create users
// @route   post /api/v1/users/
exports.createUser = async (req, res) => {
  try {
    const { password, email, name, permissions } = req?.body;

    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Please enter a valid name" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "FAILURE",
        message:
          "Password must contain minimum 8 characters, atleast 1 digit,atleast 1 special character,atleast 1 lowercase letter,at least 1 uppercase letter,",
      });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Please eneter a valid email" });
    }

    const hashPassword = await bcrypt.hash(req?.body?.password, 10);

    const user = await User.create({
      ...req?.body,
      emailVerified: true,
      profilePic: req?.file?.path,
      permissions: JSON.parse(req?.body?.permissions),
      password: hashPassword,
      createdBy: req?.userCredentials?.userId,
    });
    res.status(201).json({
      status: "SUCCESS",
      message: "User Created Successfully",
      data: user,
    });
  } catch (err) {
    console.log("error:-", err?.message);
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal Server Error",
    });
  }
};

// @desc  activated user
// @route   patch  /api/v1/users/status/:id
exports.userStatus = async (req, res) => {
  try {
    let result = req?.body?.isUserActivate ? "Activate" : "Deactivate";
    const isSuperAdmin = await User.findOne({ _id: req?.params?.id });
    console.log(isSuperAdmin, "isSuperAdmin");
    if (isSuperAdmin?.role === "SUPER_ADMIN") {
      return res.status(400).json({
        status: "FAILURE",
        message: "Super Admin Cannot be a deactivated!!",
      });
    }
    let updatedresult = await User.findByIdAndUpdate(req?.params?.id, {
      isUserActivate: result,
    });

    if (!updatedresult) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No user data found with given id!!",
      });
    }

    await res
      .status(200)
      .json({ status: "SUCCESS", message: "User status updated!!" });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};
