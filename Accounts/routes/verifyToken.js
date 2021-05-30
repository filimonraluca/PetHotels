const { response } = require('express');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const statusCodes = require("../config/configurations").statusCodes;

dotenv.config({ path: './config/config.env' })
const verifyToken = (req, res, next) => {
    console.log("HERE")
    if (typeof req.headers.authorization !== 'string') {
        res.sendStatus(statusCodes.BAD_REQUEST);
        return;
      }
    try{
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(" ")
        if (token[0] === 'Bearer' && jwt.verify(token[1],process.env.TOKEN_SECRET))
            next()
    }catch(e){
            res.status(statusCodes.UNAUTHORIZED)
            res.json({ success: false, data: { e } })
    }
}

module.exports = verifyToken;
