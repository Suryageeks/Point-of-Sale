const express = require("express");
const router = express.Router();
const {
  addBill,
  getBill,
  getOneBill,
} = require("../controllers/billController");

router.route("/addbill").post(addBill);
router.route("/getbill").get(getBill);
router.route("/getonebill/:id").get(getOneBill);

module.exports = router;
