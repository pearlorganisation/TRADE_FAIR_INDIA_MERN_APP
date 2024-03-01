const Registration = require("../models/ShopRegistration.js");
const event = require("../models/events.js");
const { vendorMail } = require("../utils/vendorMail.js");
const Category = require("../models/category.js");
const ShopRegistration = require("../models/ShopRegistration.js");
const { cloudinary } = require("../configs/cloudinary.js");

// @desc   create new shop registration
// @route   POST /api/v1/shopRegistration
exports.createRegistration = async (req, res, next) => {
  try {
    const { userId } = req.userCredentials;
    console.log(userId);
    const { category, productCategories, searchKeywords, keyPersonsDetails } =
      req.body;

    let parseCategoryData = JSON.parse(category);
    let parseProductCategory = JSON.parse(productCategories);
    let parseSearchKeyword = JSON.parse(searchKeywords);
    let parseKeyPersonsDetails = JSON.parse(keyPersonsDetails);

    // @@--------------------------------------------------------------@@End---------------------------------------------------

    const registrationData = new Registration({
      ...req?.body,
      createdBy: req?.userCredential?.userId,
      userId,
      createdBy: userId,
      searchKeywords: parseSearchKeyword,
      category: parseCategoryData,
      productCategories: parseProductCategory,
      keyPersonsDetails: parseKeyPersonsDetails,
      majorCustomerBuyer: {
        events: req?.body?.events,
        name: req?.body?.customerBuyerName,
      },
      pdfList: req?.files?.pdfList,
      logo: req?.files?.shopLogo?.[0],
    });

    let mailData = { email: req.email, password: req.password };
    vendorMail(mailData).then(async () => {
      await registrationData.save();
      res
        .status(200)
        .json({ status: "SUCCESS", msg: "Shop Created Successfully" });
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get all shop registrations
// @route   POST /api/v1/shopRegistration
exports.getRegistration = async (req, res) => {
  try {
    let filter = {};
    if (req?.userCredentials?.role === "USER") {
      filter = { createdBy: req?.userCredentials?.userId };
    }
    const allRegistrations = await Registration.find()
      .populate("category")
      .populate("createdBy", ["_id", "name", "email"])
      .populate("productCategories")
      .populate("enquiries")
      .populate("events");

    return res.status(200).json({
      status: true,
      data: allRegistrations,
      total: allRegistrations.length,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  delete shop registration
// @route   Delete /api/v1/shopRegistration/:id
exports.deleteRegistration = async (req, res) => {
  try {
    const existingShopData = await Registration.findById(req?.params?.id);
    const deletedData = await Registration.findByIdAndDelete(req?.params?.id);
    const shopMedia = existingShopData.pdfList;
    const logo = existingShopData.logo;
    shopMedia.push(logo);

    if (!existingShopData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given Id!!" });
    }

    const publicIds = shopMedia.map((item) => {
      return item.path.split("/").pop().split(".")[0];
    });

    // @@-- for deleting from cloudinary storage
    publicIds.forEach((publicId) => {
      cloudinary.uploader.destroy(
        publicId,
        (cloudinaryError, cloudinaryResult) => {
          if (cloudinaryError) {
            throw cloudinaryError;
          }

          console.log(
            cloudinaryResult,
            "Media gallery deleted from cloudinary successfully!!"
          );
        }
      );
    });
    //---------------------------------------------------------------------------

    res.status(200).json({ status: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  get single shop registration data
// @route   get /api/v1/shopRegistration/:id
exports.getSingleShopRegistration = async (req, res) => {
  try {
    const singleShopData = await Registration.findOne({
      randomString: req?.params?.id,
    })
      .populate("category")
      .populate("createdBy", ["_id", "name", "email"])
      .populate("enquiries")
      .populate("events");

    if (!singleShopData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given id!!" });
    }

    const data = await event.findOne({
      "shopDetails.shopName": singleShopData?._id,
    });

    let gallery = [];

    data?.shopDetails?.forEach((item) => {
      if (item?.shopName?.toString() === singleShopData?._id?.toString()) {
        gallery = item?.gallery;
      }
    });

    res
      .status(200)
      .json({ status: true, data: { ...singleShopData?._doc, gallery } });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  update  shop registration data
// @route  patch /api/v1/shopRegistration/:id
exports.updateShopRegistration = async (req, res) => {
  try {
    const {
      category,
      productCategories,
      searchKeywords,
      keyPersonsDetails,
      existingMedia,
    } = req.body;

    const { pdfList } = req?.files;
    const { id } = req?.params;
    const existingData = await ShopRegistration.findById(id);
    const existingPdfList = existingData.pdfList;

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    let parseCategoryData = JSON.parse(category);
    let parseExistingMedia = JSON.parse(existingMedia);
    let parseProductCategory = JSON.parse(productCategories);
    let parseSearchKeyword = JSON.parse(searchKeywords);
    let parseKeyPersonsDetails = JSON.parse(keyPersonsDetails);

    // @@--------------------------------------------------------------@@End---------------------------------------------------
    let mediaData = existingPdfList;
    if (pdfList && existingPdfList.length >= 1) {
      mediaData = [...pdfList, ...existingPdfList];
    }

    // @@---for updating media from cloudinary

    const publicIds = mediaData.map((item) => {
      return item.path.split("/").pop().split(".")[0];
    });

    publicIds.forEach((publicId) => {
      cloudinary.uploader.destroy(publicId, (err, res) => {
        if (err) {
          throw err;
        }
      });
    });

    const updatedData = await Registration.findByIdAndUpdate(req?.params?.id, {
      ...req?.body,
      searchKeywords: parseSearchKeyword,
      category: parseCategoryData,
      productCategories: parseProductCategory,
      keyPersonsDetails: parseKeyPersonsDetails,
      majorCustomerBuyer: {
        events: req?.body?.events,
        name: req?.body?.customerBuyerName,
      },
      pdfList: mediaData,
      logo: req?.files?.shopLogo?.[0],
    });

    res.status(200).json({ status: true, data: "Updated successfully" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};
