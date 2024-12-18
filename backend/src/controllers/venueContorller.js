const asyncHandler = require("../middleware/async");

const Venue = require("../models/venue");
const validationResult = require("express-validator").validationResult;

// @desc    Get venue
// @route   GET /api/v1/venue
exports.getVenues = async (req, res, next) => {
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
    const totalDocuments = await Venue.countDocuments({
      PlaceName: { $regex: search, $options: "i" },
    });
    if (Limit === "infinite") {
      limit = totalDocuments;
    }
    const totalPage = Math.ceil(totalDocuments / limit);
    const data = await Venue.find({
      PlaceName: { $regex: search, $options: "i" },
    })
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({ status: 200, data, totalPage, totalDocuments });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Get venue
// @route   GET /api/v1/venue/:id
exports.getVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findOne({ randomString: req?.params?.id });

    if (!venue) {
      return res.status(400).json({
        status: false,
        message: "No data found with given id",
      });
    }

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

const getCategory = async (req, res) => {
  console.log(req?.query?.page, req?.query?.limit, req?.query);

  try {
    const page = parseInt(req?.query?.page) || 1;
    const limit = parseInt(req?.query?.limit) || 4;
    const totalPages = await categoryModel.countDocuments();
    console.log(page, limit);
    let data = await categoryModel
      .find()
      .skip(limit * (page - 1))
      .limit(limit);
    console.log("dhf", data.length - 1);
    res.status(200).json({
      status: "SUCCESS",
      message: "Lists of category",
      data: { data, totalPages: Math.ceil(totalPages / limit) },
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// @desc    Post venue
// @route   POST /api/v1/venue/:id
exports.createVenue = async (req, res, next) => {
  try {
    const { userId } = req.userCredentials;
    let venue = await Venue.create({
      ...req.body,
      createdBy: userId,
    });

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Put venue
// @route   PUT /api/v1/venue/:id
exports.updateVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!venue) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "No Venue found with given id!!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Venue updated successfully!!" });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
};

// @desc    Delete venue
// @route   DELETE /api/v1/venue/:id
exports.deleteVenue = asyncHandler(async (req, res, next) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return next(new ErrorResponse(`No venue with id of ${req.params.id}`));
    }

    res.status(200).json({ success: true, data: venue });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err?.message || "Internal server error!!",
    });
  }
});
