const clientPageSubBanner = require("../../models/Banner/clientPageSubBanner");
exports.newClientSubBanner = async (req, res) => {
  try {
    if (req?.file && !req?.file?.mimetype.includes("image")) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Only images are allowed!!" });
    }
    const newDoc = new clientPageSubBanner({
      ...req?.body,
      banner: req?.file?.path,
    });
    await newDoc.save();

    res.status(201).json({
      status: "SUCCESS",
      message: "Banner is created successfully!!",
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.deleteSubClientBanner = async (req, res) => {
  const bannerData = await clientPageSubBanner.findByIdAndDelete(
    req?.params?.id
  );
  if (!bannerData) {
    return res
      .status(400)
      .json({ status: "FAILURE", message: "No data found with given id!!" });
  }
  res
    .status(200)
    .json({ status: "FAILURE", message: "Banner deleted successfully!!" });
};

exports.getSubBanner = async (req, res) => {
  try {
    console.log("abanner");
    const bannerData = await clientPageSubBanner.find();
    res.status(200).json({ status: "SUCCESS", data: bannerData });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.updateSubBanner = async (req, res) => {
  try {
    const existingData = await clientPageSubBanner.findById(req?.params?.id);
    if (req?.body?.active) {
      await clientPageSubBanner.updateMany(
        { _id: { $ne: req?.params?.id } },
        { active: false }
      );
    }
    const validData = await clientPageSubBanner.findByIdAndUpdate(
      req?.params?.id,
      { ...req?.body, banner: req?.file?.path || existingData?.banner }
    );
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
