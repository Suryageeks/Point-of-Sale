const express = require('express')
const router = express.Router()
const { addBill, getBill } = require('../controllers/billController')

router.route('/addbill').post(addBill)
router.route('/getbill').get(getBill)

module.exports = router
