//importing Model
const { cloudinary } = require("../configs/cloudinary");
const organiser = require("../models/organiser");

// --------------------------------create organiser------------------------------------------
const createOrganiser = async (req, res) => {
  try {
    const { userId } = req.userCredentials;

    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      images,
      websiteUrl,
      email,
      insta,
      fb,
      twitter,
      linkedIn,
      phoneNumber,
    } = req.body;

    // @@--checks for valid valid cloudinary media

    let imageFiles = [];
    let logoFile = {};

    if (req?.files["logo"] && req?.files["logo"][0]) {
      logoFile = req?.files["logo"][0];
    }

    if (
      req?.files["organiserImages"] &&
      req?.files["organiserImages"].length >= 1
    ) {
      imageFiles = req?.files["organiserImages"];
    }

    // @@----------------------------------

    let data = new organiser({
      ...req.body,
      companyName: companyName,
      address: address,
      state: state,
      city: city,
      contactPerson: JSON.parse(contactPerson),
      logo: logoFile,
      images: imageFiles,
      websiteUrl: websiteUrl,
      email: email,
      insta: insta,
      fb: fb,
      twitter: twitter,
      linkedIn: linkedIn,
      createdBy: userId,
      phoneNumber: phoneNumber,
    });

    const savedData = await data.save();
    res.status(201).json({ status: "SUCCESS", data: savedData });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ---------------------------------get organiser----------------------------------------------------

const getOrganisers = async (req, res) => {
  try {
    const data = await organiser
      .find()
      .populate("createdBy", ["_id", "email", "name"])
      .populate("enquiries");
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

//----------------------------------------update organiser------------------------------------------
const updateOrganiser = async (req, res) => {
  const { organiserImages } = req?.files;

  try {
    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      // logo,
      // images,
      websiteUrl,
      email,
      insta,
      fb,
      twitter,
      linkedIn,
      phoneNumber,
    } = req.body;
    let id = req.params.id;

    let imagePath;
    const imageFiles = [];
    // let existingImageFile;
    // let existingImages;
    // let updateContact ;
    // let contactPersonAllData , existingContactPersonAllData,contactPersonEachData;
    const logoFile = req?.files["logo"]?.[0];
    for (let i = 0; i < req?.files["organiserImages"]?.length; i++) {
      imagePath = req?.files["organiserImages"][i];
      imageFiles.push(imagePath.path);
    }

    let existingData = await organiser.findById(id);
    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    let updatedImages = existingData.images;

    const existingDataGallery = await organiser.findById(req?.params?.id);

    if (existingData && existingData.images) {
      existingImages = existingData?.images;
      existingImageFile = existingImages?.map((image) => image);
    }
    if (existingData && existingData.contactPerson) {
      contactPersonAllData = existingData?.contactPerson;

      existingContactPersonAllData = contactPersonAllData?.map((ele) => ele);
    }

    let updateImages = existingData.images;
    let updateContactData =
      contactPerson?.length > 0
        ? JSON.parse(contactPerson)
        : existingData.contactPerson;

    let data = await organiser.updateMany(
      { _id: id },
      {
        $set: {
          companyName: companyName,
          address: address,
          state: state,
          city: city,
          contactPerson: updateContactData,
          websiteUrl: websiteUrl,
          email: email,
          logo: logoFile?.path || existingData?.logo,
          images: organiserImages ? organiserImages : existingData?.images,
          insta: insta,
          fb: fb,
          twitter: twitter,
          linkedIn: linkedIn,
          phoneNumber: phoneNumber,
        },
      },
      { new: true }
    );
    console.log(data, "dataa");
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    console.log("error", err.message);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// -------------------------------getSingleOrganiser---------------------------------
const getSingleOrganiser = async (req, res) => {
  try {
    let data = await organiser.findOne({ randomString: req?.params?.id });
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({ status: "SUCCESS", data: data });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
//--------------------------deleteOrganiser----------------------------------------------
const deleteOrganiser = async (req, res) => {
  try {
    let existingOrganiser = await organiser.findById(req?.params?.id);
    // let data = await organiser.findByIdAndDelete(req?.params?.id);
    if (!existingOrganiser) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    // @@-- for deleting from cloudinary storage

    const logo = existingOrganiser.logo;
    const organiserGallery = existingOrganiser.images;
    organiserGallery.push(logo);

    const publicIds = organiserGallery.map((item) => {
      return item.path.split("/").pop().split(".")[0];
    });

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
    //-------------------------------------------------------------

    res
      .status(200)
      .json({ status: "SUCCESS", message: "Data is deleted successfully" });
  } catch (err) {
    console.log("error", error);
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
module.exports = {
  createOrganiser,
  getOrganisers,
  updateOrganiser,
  getSingleOrganiser,
  deleteOrganiser,
};
