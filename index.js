const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
var cors = require('cors')

const userRoute = require('./routes/user')

//Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

app.enable("trust proxy")
app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', '*');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

//Routes
// app.use('/', require('./routes/index'))
app.use('/api/user', userRoute)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))