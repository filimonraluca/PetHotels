const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation/user')

async function registerUser(req, res) {
    const { error } = registerValidation(req.body)
    if (error != null)
        return { success: false, data: { "message": error.details[0].message } }
    try {
        if (req.body.googleId) {
            let user = await User.findOne({ googleId: req.body.googleId })
            if (user)
                return { success: false, data: { "message": "User already exists" } };

        }
        if (req.body.username) {
            let user = await User.findOne({ username: req.body.username })
            if (user)
                return { success: false, data: { "message": "User already exists" } }

        }
        //Hash password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            googleId: req.body.googleId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
            phone: req.body.phone
        })
        user = await User.create(newUser)
        return { success: true, data: { user } }

    } catch (err) {
        return { success: false, data: { err } }
    }
}

async function loginUser(req, res) {
    const { error } = loginValidation(req.body)
    if (error != null)
        return { success: false, data: { "message": error.details[0].message } }
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user)
            return { success: false, data: { "message": "Username does not exists" } }

        //verify password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return { success: false, data: { "message": "Invalid password" } }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token',token)
        return { success: true, data: { token } }

    } catch (err) {
        return { success: false, data: { err } }
    }
}

async function logoutUser(req, res) {
   try{
       delete req.header('auth-token');
       delete req.user;
       return { success: true, data: { "message": "Logout sucessfuly" } }
   } 
   catch (err){
    return { success: false, data: { err } }
   }
}

module.exports = { registerUser, loginUser, logoutUser }