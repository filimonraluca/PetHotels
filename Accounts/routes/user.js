const express = require('express')
const router = express.Router()
const User = require('../model/User')
const verifyToken = require('./verifyToken')
const { registerUser, loginUser, getUsers, getUserById,changeUserInfo, deleteUser, loginGoogleUser } = require('../controller/user')

const statusCodes = require("../config/configurations").statusCodes;


router.post('/', async (req, res) => {
  const result = await registerUser(req, res)
  res.json(result);
});

router.post('/login/google', async (req, res) => {
  const result = await loginGoogleUser(req, res)
  const statusCode = result.success
    ? statusCodes.OK
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.post('/login', async (req, res) => {
  const result = await loginUser(req, res)
  const statusCode = result.success
    ? statusCodes.OK
    : statusCodes.BAD_REQUEST;
  res.status(statusCode).json(result);
});

router.get('/test',verifyToken, (req, res) => {
  res.send("OK");
})

router.get('/:userId', async (req, res) => {
  const result = await getUserById(req, res)
  res.json(result);
})

router.get('/', async (req, res) => {
  const result = await getUsers(req, res)
  res.json(result);
})

router.put('/', (req,res) => {
  res.status(statusCodes.NOT_ALLOWED);
  res.json({message: "Method Not Allowed"})
})

router.put('/:userId', async (req, res) => {
  const result = await changeUserInfo(req, res)
  res.json(result);
})

router.delete('/', (req,res) => {
  res.status(statusCodes.NOT_ALLOWED);
  res.json({message: "Method Not Allowed"})
})

router.delete('/:userId', async (req, res) => {
  const result = await deleteUser(req, res)
  res.json(result);
})

module.exports = router;