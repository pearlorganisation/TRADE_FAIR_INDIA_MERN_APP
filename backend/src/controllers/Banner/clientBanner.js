const clientPageBanner = require("../../models/Banner/clientPageBanner");
const { cloudinary } = require("../../configs/cloudinary");

exports.newClientBanner = async (req, res) => {
  try {
    // if (req?.files && !req?.file?.mimetype.includes("image")) {
    //   return res
    //     .status(400)
    //     .json({ status: "FAILURE", message: "Only images are allowed!!" });
    // }
    const newDoc = new clientPageBanner({
      ...req?.body,
      banner: req?.files?.banner[0]?.path,
      mobileBanner: req?.files?.mobileBanner[0]?.path,
    });
    console.log(newDoc);
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
  try {
    const existingData = await clientPageBanner.findById(req?.params?.id);

    let publicId = existingData?.banner?.split("/").pop().split(".")[0];

    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data found with the given id!!",
      });
    }

    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(error);
        return res
          .status(400)
          .json({ status: "FAILURE", message: error.message });
      }
    });
    await clientPageBanner.findByIdAndDelete(req?.params?.id);
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Banner deleted successfully!!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "FAILURE", message: "Internal Server Error" });
  }
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
    if (req?.body?.active) {
      await clientPageBanner.updateMany(
        { _id: { $ne: req?.params?.id } },
        { active: false }
      );
    }
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
