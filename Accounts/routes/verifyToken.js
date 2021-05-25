const { response } = require('express');
const jwt = require('jsonwebtoken');
const statusCodes = require("../config/configurations").statusCodes;
module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({"Message":'Access denied!'})
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        next()
    }catch(err){
       res.status(statusCodes.BAD_REQUEST).send({"Message": 'Inavlid token'})
    }
}
