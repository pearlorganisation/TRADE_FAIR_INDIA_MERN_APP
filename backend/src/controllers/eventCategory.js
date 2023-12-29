const eventCategory = require("./../models/eventCategory");

exports.createEventCategory = async (req, res) => {
  try {
    const category = new eventCategory({ ...req?.body });
    await category.save();
    res.status(201).json({
      status: "SUCCESS",
      message: "Event category  created successfully!!",
    });
  } catch (e) {
    res.status(400).json({
      status: "SUCCESS",
      message: e?.message || "Internal server error",
    });
  }
};

exports.getAllEventCategory = async (req, res) => {
  try {
    const categoryData = await eventCategory.find();
    res.status(200).json({ status: "SUCCESS", data: categoryData });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};

exports.deleteEventCategory = async (req, res) => {
  try {
    const categoryData = await eventCategory.findByIdAndDelete(req?.params?.id);
    if (!categoryData) {
      return res.status(400).json({
        status: "SUCCESS",
        message: "No  data found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Event category  deleted successfully!!",
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};

exports.updateEventCategory = async (req, res) => {
  try {
    const categoryData = await eventCategory.findByIdAndUpdate(req?.params?.id);
    if (!categoryData) {
      return res.status(400).json({
        status: "SUCCESS",
        message: "No faq data found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Event category updated successfully!!",
    });
  } catch (e) {
    res.status(400).json({
      status: "FAILURE",
      message: e?.message || "Internal server error!!",
    });
  }
};
