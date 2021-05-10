const express = require('express')
const router = express.Router()
const User = require('../model/User')
const verify = require('./verifyToken')
const { registerUser, loginUser, logoutUser } = require('../controller/user')

const statusCodes = {
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
}


router.post('/', async (req, res) => {
    const result = await registerUser(req,res)
    const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.post('/login', async (req, res) => {
    const result = await loginUser(req,res)
    const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.get('/logout',verify, async (req, res) => {
    const result = await logoutUser(req,res)
    const statusCode = result.success
    ? statusCodes.OK
    : statusCodes.BAD_REQUEST;
    res.status(statusCode).json(result);
})


module.exports = router;