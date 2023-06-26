const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    const item = await Product.create(req.body);

    //ADD THE FUNCTIONALITIES FOR CLOUDINARY FOR STORING IMAGES

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const item = await Product.find();
    res.status(200).json({
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);

    if (!item) {
      return res.status(400).json({
        msg: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        msg: "Product Not Found and Cannot Be Deleted",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Product Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        msg: "Product Not Found and Cannot Be Updated",
      });
    }

    item = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categoryEnum = await Product.distinct("category");

    res.status(200).json({
      success: true,
      categoryEnum,
    });
  } catch (error) {
    console.log(error);
  }
};
