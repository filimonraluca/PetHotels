const Joi = require('joi')

const registerValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(6),
        hotelName: Joi.string().min(3),
        hotelDescription: Joi.string().min(10),
        city: Joi.string().min(2),
        address: Joi.string().min(5),
        email: Joi.string().min(6).email(),
        phone: Joi.string(),
        rooms: Joi.number(),
        pricePerNight: Joi.number()
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