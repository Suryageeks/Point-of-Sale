const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isLoggedIn = async (req, res, next) => {
    try {
        
        const token = req.cookies.token
        
        if (!token) {
            return res.status(400).json({
                success: false,
                msg: 'Token Not Available'
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decoded.id)
        next()
    }
    catch (error) {
        console.log(error)
    }
}