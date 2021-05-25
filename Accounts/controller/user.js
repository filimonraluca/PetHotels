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
            else {
                console.log(req.body)
                const newUser = new User({
                    googleId: req.body.googleId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                })
                user = await User.create(newUser)
                return { success: true, data: {user} }
            }

        }
        else{
            let user = await User.findOne({ email: req.body.email })
            if (user)
                return { success: false, data: { "message": "You already have an account" } }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashPassword,
                email: req.body.email,
                phone: req.body.phone
            })
            user = await User.create(newUser)
            return { success: true, data: { user } }
        }

    } catch (err) {
        return { success: false, data: { err } }
    }
}

async function loginUser(req, res) {
    const { error } = loginValidation(req.body)
    if (error != null)
        return { success: false, data: { "message": error.details[0].message } }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user)
            return { success: false, data: { "message": "Email does not exists" } }

        //verify password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return { success: false, data: { "message": "Invalid password" } }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token)
        return { success: true, data: { user,token } }

    } catch (err) {
        return { success: false, data: { err } }
    }
}


module.exports = { registerUser, loginUser }