const User = require('../models/user')
const cookieToken = require('../utils/cookieToken')


exports.register = async (req, res) => {
    
    try {
        
        const { name, email, password, mobile } = req.body
        
        if (!name || !email || !password) {
            return res.status(400).json({
                msg: "Credintials Missing"
            })
        }
        
        const emailExists = await User.findOne({ email })
        
        if (emailExists) {
            return res.status(400).json({
                msg:'Email already exists'
            })
        }

        const registerUser = await User.create({
            name,
            email,
            password,
            mobile
        })

        cookieToken(registerUser,res)

    }
    catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    
    try {
        
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({
                msg:'Credintials Missing'
            })
        }

        const user = await User.findOne({ email }).select('+password')
        
        if (!user) {
            return res.status(400).json({
                msg:'User doesnt Exists'
            })
        }

        const passwordMatch = await user.isValidatedPassword(password)

        if (!passwordMatch) {
            return res.status(400).json({
                msg:'Password Doesnt Matched'
            })
        }

        cookieToken(user, res)
        

    }
    catch (error) {
        console.log(error)
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly:true
    }).status(200).json({
        success: true,
        msg:'Logged Out Successfull'
    })
}

exports.getLoggedInUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        
        res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        console.log(error)
    }
}