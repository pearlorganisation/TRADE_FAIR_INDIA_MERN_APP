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

exports.getAllUrl = async (req, res) => {
  try {
    const data = await eventUrl.find();
    res.status(200).json({ status: true, data });
  } catch (e) {
    res
      .status(200)
      .json({ status: false, message: e?.message || "Internal server error" });
  }
};
