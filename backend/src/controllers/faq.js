const Faq = require("../models/faq");

exports.createNewFaq = async (req, res) => {
  try {
    const newFaq = new Faq({ ...req?.body });
    await newFaq.save();
    res
      .status(201)
      .json({ status: "SUCCESS", message: "Faq created successfully!!" });
  } catch (e) {
    res.status(400).json({
      status: "SUCCESS",
      message: e?.message || "Internal server error",
    });
  }
};

exports.getAllFaq = async (req, res) => {
  try {
    const faqData = await Faq.find();
    res.status(200).json({ status: "SUCCESS", data: faqData });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const faqData = await Faq.findByIdAndDelete(req?.params?.id);
    if (!faqData) {
      return res.status(400).json({
        status: "SUCCESS",
        message: "No faq data found with given id!!",
      });
    }
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Faq deleted successfully!!" });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const faqData = await Faq.findByIdAndUpdate(req?.params?.id);
    if (!faqData) {
      return res.status(400).json({
        status: "SUCCESS",
        message: "No faq data found with given id!!",
      });
    }
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Faq updated successfully!!" });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};
