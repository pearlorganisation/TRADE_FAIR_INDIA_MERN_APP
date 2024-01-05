const eventBanner = require("../../models/Banner/eventBanner");

exports.createEventBanner = async (req, res) => {
  try {
    if (req?.file && !req?.file?.mimetype.includes("image")) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Only images are allowed!!" });
    }
    const newDoc = new eventBanner({
      ...req?.body,
      banner: req?.file?.path,
    });
    await newDoc.save();

    res.status(201).json({
      status: "SUCCESS",
      message: "Event Banner is created successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.deleteEventBanner = async (req, res) => {
  const bannerData = await eventBanner.findByIdAndDelete(req?.params?.id);

  if (!bannerData) {
    return res
      .status(400)
      .json({ status: "FAILURE", message: "No data found with given id!!" });
  }
  res.status(200).json({
    status: "FAILURE",
    message: "Event Banner deleted successfully!!",
  });
};

exports.getEventBanner = async (req, res) => {
  try {
    const bannerData = await eventBanner.find();
    res.status(200).json({ status: "SUCCESS", data: bannerData });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.updateEventBanner = async (req, res) => {
  try {
    const existingData = await eventBanner.findById(req?.params?.id);
    if (req?.body?.active) {
      await eventBanner.updateMany(
        { _id: { $ne: req?.params?.id } },
        { active: false }
      );
    }
    const validData = await eventBanner.findByIdAndUpdate(req?.params?.id, {
      ...req?.body,
      banner: req?.file?.path || existingData?.banner,
    });
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Updated successfully!!" });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error",
    });
  }
};
