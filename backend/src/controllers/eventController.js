// @imports-section
const { cloudinary } = require("../configs/cloudinary");
const authModel = require("../models/Authentication/authenticationModel");
const ShopRegistration = require("../models/ShopRegistration");
const Event = require("../models/events");

// @desc   create new event
// @route   POST /api/v1/EventRegistration
exports.createEvent = async (req, res) => {
  try {
    const { shopDetails, eventDate, ageGroup, organiser, category } = req?.body;
    const { userId } = req?.userCredentials;
    const { shopGalleries } = req?.files;

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseOrganiser = JSON.parse(organiser);
    let parseEventDate = JSON.parse(eventDate);
    let parseShop = JSON.parse(shopDetails);
    let parseCategory = JSON.parse(category);

    let shopId =
      parseShop &&
      Array.isArray(parseShop) &&
      parseShop.map((item) => {
        return item?.shopName;
      });

    if (shopGalleries && Array.isArray(shopGalleries)) {
      for (let i = 0; i < shopGalleries.length; i++) {
        parseShop.forEach((item) => {
          if (
            shopGalleries[i].originalname.includes(item.uniqueKey.toString())
          ) {
            if (!item?.gallery) {
              let gallery = [];
              item.gallery = gallery;
            }
            item.gallery.push(shopGalleries[i]);
          }
        });
      }
    }

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    if (!shopDetails || typeof shopDetails !== "string") {
      return res.status(400).json({
        status: true,
        message: "shops details field is required and Please stringify it",
      });
    }

    if (!ageGroup || typeof ageGroup !== "string") {
      return res.status(400).json({
        status: true,
        message: "age group field is required and Please stringify it",
      });
    }

    // @@--------------------------------------------------------------@@End---------------------------------------------------

    // const { userId } = req.userCredentials;
    const eventData = new Event({
      ...req?.body,
      organiser: parseOrganiser,
      createdBy: userId,
      eventBrochure: req?.files?.eventBrochure,
      shopDetails: parseShop,
      eventBanner: req?.files?.eventBanner[0],
      eventLogo: req?.files?.eventLogo[0],
      eventDate: parseEventDate,
      ageGroup: parseAgeGroup,
      category: parseCategory,
    });

    const savedEventData = await eventData.save();

    const newData = await ShopRegistration.updateMany(
      { _id: { $in: shopId } },
      {
        $push: {
          events: savedEventData?._id.toString(),
        },
      }
    );

    res.status(201).json({
      status: true,
      data: newData,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get all event event
// @route   POST /api/v1/EventRegistration
exports.getEvent = async (req, res) => {
  const { Page, Limit, Search } = req.query;

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
    const totalDocuments = await Event.countDocuments({
      eventName: { $regex: search, $options: "i" },
    });
    if (Limit === "infinite") {
      limit = totalDocuments;
    }
    const totalPage = Math.ceil(totalDocuments / limit);
    const allEvents = await Event.find({
      eventName: { $regex: search, $options: "i" },
    })
      .populate("organiser", ["_id", "companyName"])
      .populate("venue", ["_id", "PlaceName", "Address", "City"])
      .populate("category", ["_id", "category"])
      .populate("shopDetails.shopName")
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalEvents = await Event.countDocuments();
    res.status(200).json({
      status: true,
      data: allEvents,
      totalDocuments,
      totalPage,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  delete event registration
// @route   Delete /api/v1/eventRegistration/:id
exports.deleteEvent = async (req, res) => {
  try {
    const existingData = await Event.findById(req?.params?.id);

    if (!existingData) {
      return res
        .status(404)
        .json({ status: false, message: "No data found with given Id!!" });
    }
    const combineGallery = [
      existingData?.eventBanner?.path,
      existingData?.eventBrochure[0].path,
      existingData?.eventLogo?.path,
    ];
    const publicIds = combineGallery.map((item) => {
      return item.split("/").pop().split(".")[0];
    });

    // @@-- for deleting from cloudinary storage
    publicIds.forEach((publicId) => {
      cloudinary.uploader.destroy(
        publicId,
        (cloudinaryError, cloudinaryResult) => {
          if (cloudinaryError) {
            throw cloudinaryError;
          }
        }
      );
    });
    //--------------------------------------------------------------------

    await Event.findByIdAndDelete(req?.params?.id);
    res.status(400).json({ status: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(200).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

// @desc  get single shop event data for dynamic event url
// @route   get /api/v1/event/:id
exports.getSingleEvent = async (req, res) => {
  try {
    const singleEventData = await Event.findOne({
      randomString: req?.params?.id,
    })
      .populate("organiser", ["_id", "companyName", "logo"])
      .populate("venue", ["_id", "PlaceName", "Address", "GeoLocation", "City"])
      .populate("category", ["_id", "category"])
      .populate("shopDetails.shopName")
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries")
      .populate("category");

    if (!singleEventData) {
      return res
        .status(400)
        .json({ status: false, message: "No data found with given id!!" });
    }
    res.status(200).json({ status: true, data: singleEventData });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error",
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    let {
      shopDetails,
      eventDate,
      ageGroup,
      organiser,
      existingShopGallery,
      newShopDetails,
      category,
    } = req?.body;

    const { shopGalleries } = req?.files;
    let parseNewShopDetails = [];
    if (newShopDetails) {
      parseNewShopDetails = JSON.parse(newShopDetails);
    }

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseEventDate = JSON.parse(eventDate);
    let parseShop = JSON.parse(shopDetails);
    let parseOrganiser = JSON.parse(organiser);
    let parseCategory = JSON.parse(category);

    let newShopData = [];
    let logo;
    let banner;
    let pdf;

    if (req?.files?.eventBanner && req?.files?.eventBanner.length >= 1) {
      banner = req?.files?.eventBanner[0];
    }

    if (req?.files?.eventLogo && req?.files?.eventLogo?.length >= 1) {
      logo = req?.files?.eventLogo[0];
    }

    if (req?.files?.eventBrochure && req?.files?.eventBrochure?.length >= 1) {
      pdf = req?.files?.eventBrochure[0];
    }

    if (shopGalleries && shopGalleries.length >= 1) {
      shopGalleries?.forEach((imgItem, i) => {
        parseShop?.forEach((shopItem) => {
          if (newShopDetails && parseNewShopDetails) {
            parseNewShopDetails?.map((pItem) => {
              if (imgItem?.originalname?.includes(pItem?.uniqueKey)) {
                pItem.gallery = [];
                pItem?.gallery.push(imgItem);
              }
            });
          }
          if (imgItem?.originalname?.includes(shopItem?.uniqueKey)) {
            shopItem.gallery.push(imgItem);
          }
        });
      });
    }

    let existingData = await Event.findById(req?.params?.id);
    // const existingMediaGallery = [];
    // Array.isArray(existingData?.shopDetails) &&
    //   existingData?.shopDetails?.forEach((i) => {
    //     Array.isArray(i?.gallery) &&
    //       i?.gallery?.forEach((item) => {
    //         existingMediaGallery.push(item);
    //       });
    //   });

    shopDetails = [...parseShop, ...parseNewShopDetails];

    const eventData = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req?.body,
        organiser: parseOrganiser,
        ageGroup: parseAgeGroup,
        eventPdf: req?.files?.files,
        gallery: req?.files?.gallery,
        shopDetails,
        eventLogo: logo || existingData?.eventLogo,
        eventBanner: banner || existingData?.eventBanner,
        eventDate: parseEventDate,
        category: parseCategory,
      },
      { new: true }
    );
    const savedEventData = await eventData.save();
    res.status(201).json({ status: true, data: savedEventData });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};
