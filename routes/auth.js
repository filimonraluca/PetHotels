const { setToken } = require('../controller/auth')
const express = require('express')
const router = express.Router() 

const statusCodes = {
    BAD_REQUEST: 400,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
}

router.post('/google', async (req, res) => {
    const result = await setToken(req,res)
    console.log(result)
    const statusCode = result.success
    ? statusCodes.CREATED
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

module.exports = router;