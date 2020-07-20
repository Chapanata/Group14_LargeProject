// validation.js

const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data =>
{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schema.validate(data);
}

// Login validation
const loginValidation = data =>
{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return schema.validate(data);
}

// Confirmation validation
const confirmValidation = data =>
{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        confirmCode: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.confirmValidation = confirmValidation;