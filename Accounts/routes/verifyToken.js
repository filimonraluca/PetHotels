const { response } = require('express');
const jwt = require('jsonwebtoken');
const statusCodes = require("../config/configurations").statusCodes;
module.exports = async function (req, res, next) {
    console.log("HERE")
    const token = req.header('auth-token');
    console.log(token)
    if (!token) return res.status(401).send({ "Message": 'Access denied!' })
    // try {
        if (jwt.verify(token, process.env.TOKEN_SECRET))
            next()
        else {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "J1mrXwCvrJXsavpjAntfjCHq",
            });
            console.log(ticket)
            next()
        }
    // } 
    // catch (err) {
    //     res.status(statusCodes.BAD_REQUEST).send({ "Message": 'Inavlid token!' })
    // }
}
