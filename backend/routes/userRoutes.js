const express = require('express')
const router = express.Router()

const { register, login, logout, getLoggedInUserDetails } = require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile').get(isLoggedIn, getLoggedInUserDetails)





module.exports = router