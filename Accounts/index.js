const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
var cors = require('cors')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

//Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

app.enable("trust proxy")
app.use(express.json())
app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))