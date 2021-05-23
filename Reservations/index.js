const express = require("express");
const connectDB = require("./config/db");
const config = require("./config/configurations");
var cors = require("cors");
const verify = require("./middlewares/verifyToken");

const reservationRoute = require("./routes/reservation");

connectDB();

const app = express();

app.enable("trust proxy");
app.use(express.json());
app.use(cors());
app.use("/api/reservation", reservationRoute);

const PORT = config.port;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
