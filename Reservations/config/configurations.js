const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({ path: "./config/.env" });
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
console.log(process.env.PORT);
module.exports = {
  port: process.env.PORT || 5000,
  databaseURL: process.env.MONGO_URI,
  statusCodes: {
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  },
};
