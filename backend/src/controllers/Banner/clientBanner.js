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
    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No banner data found with given id!!",
      });
    }

    if (req?.file) {
      let publicId = existingData?.banner?.split("/").pop().split(".")[0];
      cloudinary.uploader.destroy(publicId, (e, r) => {
        if (e) {
          return res.status(400).json({ status: "FAILURE", message: e });
        }
      });
    }

    if (req?.body?.active) {
      await clientPageBanner.updateMany(
        { _id: { $ne: req?.params?.id } },
        { active: false }
      );
    }
    const validData = await clientPageBanner.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
        banner:
          (Array.isArray(req?.files?.banner) &&
            req?.files?.banner.length >= 1 &&
            req?.files?.banner[0]?.path) ||
          existingData?.banner,
        mobileBanner:
          (Array.isArray(req?.files?.mobileBanner) &&
            req?.files?.mobileBanner.length >= 1 &&
            req?.files?.mobileBanner[0]?.path) ||
          existingData?.mobileBanner,
      }
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
