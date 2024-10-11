const categoryModel = require("../models/category");

// ---------------------------------createCategory-------------------------------------------
const createCategory = async (req, res) => {
  try {
    const { category, productCategories } = req.body;

    let data = new categoryModel({
      category: category,
      productCategories: productCategories,
    });
    const savedData = await data.save();
    res.status(201).json({
      status: "SUCCESS",
      message: "Category is created successfully",
      data: savedData,
    });
  } catch (err) {
    res.status(500).json({ status: "FAILURE", error: err?.message });
  }
};
// ----------------------------------getCategory-------------------------------------------------
const getCategory = async (req, res) => {
  const { Page, Limit, Search } = req.query;
  console.log(Limit);
  let page = 1;
  let limit = 10;
  let search = "";

  if (Page) {
    page = Math.max(page, Page);
  }
  if (Limit) {
    limit = Math.max(limit, Limit);
  }
  if (Search) {
    search = Search;
  }

  let skip = (page - 1) * limit;

  try {
    const totalDocuments = await categoryModel.countDocuments({
      category: { $regex: search, $options: "i" },
    });
    if (Limit === "infinite") {
      limit = totalDocuments;
    }
    const totalPage = Math.ceil(totalDocuments / limit);
    let data = await categoryModel
      .find({
        category: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.log("dhf", data.length - 1);
    res.status(200).json({
      status: "SUCCESS",
      message: "Lists of category",
      data: data,
      totalPage,
      totalDocuments,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ---------------------------------getSingleCategory-------------------------------------------
const getSingleCategory = async (req, res) => {
  try {
    let data = await categoryModel.findById(req?.params?.id);
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Particular category data",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------updateCategory----------------------------------------------
const updateCategory = async (req, res) => {
  try {
    let data = await categoryModel.findByIdAndUpdate(
      { _id: req?.params?.id },
      { $set: { category: req?.body?.category } },
      { new: true }
    );
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      message: "Category is updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILURE",
      error: error?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------------deleteCategory-----------------------------------
const deleteCategory = async (req, res) => {
  try {
    let data = await categoryModel.findByIdAndDelete(req?.params?.id);
    if (!data) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }

    res.status(200).json({
      status: "SUCCESS",
      message: "Category Data is deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};
// ----------------------------------createProductCategory------------------------------------------------

const createProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.id;
    let existingData = await categoryModel.findById(productCategoryId);
    let data = await categoryModel.findByIdAndUpdate(
      { _id: productCategoryId },
      {
        $push: { productCategories: req?.body?.productCategories },
      },
      { new: true }
    );
    if (!existingData) {
      return res.status(400).json({
        status: "FAILURE",
        message: "No data is found with given id!!",
      });
    }
    res.status(201).json({
      status: "SUCCESS",
      message: "Product Category is created successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ---------------------------------------updateProductCategory------------------------------------

const updateProductCategory = async (req, res) => {
  try {
    let data = await categoryModel.findByIdAndUpdate(
      {
        _id: req?.params?.id,
      },

      {
        category: req.body.category,
        productCategories: req.body.productCategories,
      },

      { new: true }
    );
    res.status(200).json({
      status: "SUCCESS",
      message: "Product Category is updated successfull",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

// ------------------------------------------deleteProductCategory---------------------------------------

const deleteProductCategory = async (req, res) => {
  try {
    // let flag = false
    let data = await categoryModel.findByIdAndUpdate(
      { _id: req?.params?.id },
      { $pull: { productCategories: { _id: req?.params?.productCategoryId } } }
    );

    res.status(200).json({
      status: "SUCCESS",
      message: "Product Category Data is deleted successfully",
    });
    // if(!data?.){
    //     return res.status(400).json({status : "FAILURE" ,message : "No data is found with given id!!" })
    //  }
  } catch (err) {
    res.status(500).json({
      status: "FAILURE",
      error: err?.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createCategory,
  createProductCategory,
  getCategory,
  getSingleCategory,
  updateCategory,
  updateProductCategory,
  deleteProductCategory,
  deleteCategory,
};
