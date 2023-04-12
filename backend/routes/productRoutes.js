const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getCategory,
} = require("../controllers/productController");

router.route("/addproduct").post(addProduct);
router.route("/getproduct").get(getProduct);
router.route("/getcategory").get(getCategory);

router.route("/getoneproduct/:id").get(getOneProduct);
router.route("/deleteproduct/:id").delete(deleteProduct);
router.route("/updateproduct/:id").put(updateProduct);

module.exports = router;
