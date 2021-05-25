const express = require('express')
const router = express.Router()
const User = require('../model/User')
const verify = require('./verifyToken')
const { registerUser, loginUser, getUsers, getUserById } = require('../controller/user')

const statusCodes = require("../config/configurations").statusCodes;


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

router.get('/:userId', async (req, res) =>{
   const result = await getUserById(req,res)
   const statusCode = result.success
    ? statusCodes.OK
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
})

router.get('/', async (req, res) => {
  const result = await getUsers(req,res)
  const statusCode = result.success
   ? statusCodes.OK
   : statusCodes.BAD_REQUEST;
 res.status(statusCode).json(result);
})

module.exports = router;