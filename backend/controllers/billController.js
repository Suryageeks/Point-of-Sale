const Bills = require("../models/bills");

exports.addBill = async (req, res) => {
  try {
    const invoice = await Bills.create(req.body);

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBill = async (req, res) => {
  try {
    const limitValue = 100;
    const skipValue = 0;
    const invoice = await Bills.find().limit(limitValue).skip(skipValue);

    res.status(200).json({
      invoice,
    });
  } catch (error) {
    console.log(error);
  }
};
