const Joi = require('joi')

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(3),
        lastName: Joi.string().min(3),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6),
        phone: Joi.string(),
        googleId: Joi.string()
    })
    return schema.validate(data)
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6)
    })
    return schema.validate(data)
}

module.exports = { loginValidation, registerValidation }