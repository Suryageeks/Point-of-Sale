const express = require('express')
require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

//regular middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

//HTTP request logger middleware
app.use(morgan('tiny'))

//Routes
const user = require('./routes/userRoutes')
const product = require('./routes/productRoutes')
const bills = require('./routes/billRoutes')



//Routes middleware
app.use('/api/v1', user)
app.use('/api/v1', product)
app.use('/api/v1', bills)





module.exports = app
