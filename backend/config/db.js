const mongoose = require('mongoose')
const { MONGODB_URI } = process.env

const connectDB = () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log('DB Connected'))
        .catch(error => {
            console.log('DB not Connected')
            console.log(error)
            process.exit(1)
        })
}

module.exports = connectDB