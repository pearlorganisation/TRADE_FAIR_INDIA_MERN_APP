const clientPageBanner = require("../../models/Banner/clientPageSubBanner");
exports.newClientBanner = async (req, res) => {
  try {
    if (req?.file && !req?.file?.mimetype.includes("image")) {
      return res
        .status(400)
        .json({ status: "FAILURE", message: "Only images are allowed!!" });
    }
    const newDoc = new clientPageBanner({
      ...req?.body,
      banner: req?.file?.path,
    });
    await newDoc.save();

    res
      .status(201)
      .json({ status: "SUCCESS", message: "Banner is created successfully!!" });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.deleteClientBanner = async (req, res) => {
  const bannerData = await clientPageBanner.findByIdAndDelete(req?.params?.id);
  if (!bannerData) {
    return res
      .status(400)
      .json({ status: "FAILURE", message: "No data found with given id!!" });
  }
  res
    .status(200)
    .json({ status: "FAILURE", message: "Banner deleted successfully!!" });
};

exports.getBanner = async (req, res) => {
  try {
    const bannerData = await clientPageBanner.find();
    res.status(200).json({ status: "SUCCESS", data: bannerData });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      message: err?.message || "Internal server error!!",
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const existingData = await clientPageBanner.findById(req?.params?.id);
    const validData = await clientPageBanner.findByIdAndUpdate(
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
