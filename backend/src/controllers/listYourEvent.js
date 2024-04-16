const eventUrl = require("../models/listYourEvent");

exports.newListUrl = async (req, res) => {
  try {
    const newDoc = new eventUrl(req?.body);
    await newDoc.save();
    res.status(201).json({ status: true, message: "Created successfully!!" });
  } catch (e) {
    res.status(500).json({
      status: "FAILURE",
      error: e?.message || "Internal Server Error",
    });
  }
};

exports.updateListUrl = async (req, res) => {
  try {
    const listUrl = await eventUrl.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!listUrl) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No List Url found with given id!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "List Your Url Link updated successfully!!",
    });
  } catch (e) {
    res.status(500).json({
      status: "FAILURE",
      error: e?.message || "Internal Server Error",
    });
  }
};

exports.getAllUrl = async (req, res) => {
  try {
    const data = await eventUrl.find();
    res.status(200).json({ status: true, data });
    res.status(200);
  } catch (e) {
    res
      .status(200)
      .json({ status: false, message: e?.message || "Internal server error" });
  }
};

exports.deleteListYourEvent = async (req, res) => {
  try {
    const data = await eventUrl.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: "Successfully Deleted..." });
  } catch (e) {
    res
      .status(200)
      .json({ status: false, message: e?.message || "Internal server error" });
  }
};
