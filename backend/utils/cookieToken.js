const cookieToken = (user, res) => {
    const token = user.jwtTokenization()

    res.status(200).cookie('token', token, {
        expires: new Date(Date.now() + (24 * 60 * 60*1000)),
        httpOnly:true        
    }).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieToken