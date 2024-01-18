// @imports-section
const { cloudinary } = require("../configs/cloudinary");
const ShopRegistration = require("../models/ShopRegistration");
const Event = require("../models/events");

// @desc   create new event
// @route   POST /api/v1/EventRegistration
exports.createEvent = async (req, res) => {
  try {
    const { shopDetails, eventDate, ageGroup, organiser } = req?.body;
    const { userId } = req?.userCredentials;
    const { shopGalleries } = req?.files;
    console.log(shopGalleries, "hello");

    // if (!shopDetails || typeof shopDetails === "string") {
    //   return res.status(200).json({
    //     status: "FAILURE",
    //     message: "Shop details is required and pleaswe stringify it!!",
    //   });
    // }

    // if (!eventData || typeof shopDetails === "string") {
    //   return res.status(200).json({
    //     status: "FAILURE",
    //     message: "Event data is require and please stringify it!!",
    //   });
    // }

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseOrganiser = JSON.parse(organiser);
    let parseEventDate = JSON.parse(eventDate);
    let parseShop = JSON.parse(shopDetails);

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
  try {
    const allEvents = await Event.find()
      .populate("organiser", ["_id", "companyName"])
      .populate("venue", ["_id", "PlaceName","Address","city"])
      .populate("category", ["_id", "category"])
      .populate("shopDetails.shopName")
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries");

    const totalEvents = await Event.countDocuments();
    res.status(200).json({
      status: true,
      data: allEvents,
      total: totalEvents,
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

          console.log(
            cloudinaryResult,
            " Media gallery deleted from cloudinary successfully!!"
          );
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
      .populate("venue", ["_id", "PlaceName", "Address", "GeoLocation"])
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
    const { shopDetails, eventDate, ageGroup, organiser, existingShopGallery } =
      req?.body;
    console.log(req?.files, "filess");
    const { shopGalleries } = req?.files;

    let parseAgeGroup = JSON.parse(ageGroup);
    let parseEventDate = JSON.parse(eventDate);
    let parseShop = JSON.parse(shopDetails);
    let parseOrganiser = JSON.parse(organiser);

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
          if (imgItem?.originalname?.includes(shopItem?.uniqueKey)) {
            shopItem?.gallery.push(imgItem);
          }
        });
      });
    }

    //--------------------------------------@@validations for formdata  and parsing formdata section----------------------------

    let existingData = await Event.findById(req?.params?.id);

    if (existingShopGallery) {
      parseShopMedia = JSON.parse(existingShopGallery);
    }

    if (!shopDetails || typeof shopDetails !== "string") {
      return res.status(400).json({
        status: true,
        message: "shops details field is required and Please stringify it",
      });
    }

    // if (!eventDate || typeof shoeventDateps !== "string") {
    //   return res.status(400).json({
    //     status: true,
    //     message: "event date field is required and Please stringify it",
    //   });
    // }

    if (!ageGroup || typeof ageGroup !== "string") {
      return res.status(400).json({
        status: true,
        message: "age group field is required and Please stringify it",
      });
    }
    // @@--------------------------------------------------------------@@End---------------------------------------------------
    const eventData = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req?.body,
        organiser: parseOrganiser,
        ageGroup: parseAgeGroup,
        eventPdf: req?.files?.files,
        gallery: req?.files?.gallery,
        shopDetails: parseShop,
        eventLogo: logo || existingData?.eventLogo,
        eventBanner: banner || existingData?.eventBanner,

        eventDate: parseEventDate,
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
