// validation.js

const Joi = require('@hapi/joi');

  //-----------------------------//
 //      User Validation        //
//-----------------------------//

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

const forgotPassValidation = data =>
{
    const schema = Joi.object({
        email: Joi.string().required().email(),
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.confirmValidation = confirmValidation;
module.exports.forgotPassValidation = forgotPassValidation;


  //-----------------------------//
 //      Food Validation        //
//-----------------------------//

// Add Food validation
const addFoodValidation = data =>
{
    const schema = Joi.object({
        foodId: Joi.number().required(),
        quantity: Joi.number().required(),
        energy: Joi.number().required(),
        totalFat: Joi.number().required(),
        saturates: Joi.number().required(),
        carbs: Joi.number().required(),
        totalSugars: Joi.number().required(),
        protein: Joi.number().required(),
        salt: Joi.number().required()
    });

    return schema.validate(data);
}

// Get Food validation
const getFoodsValidation = data =>
{
    const schema = Joi.object({
        dayCount: Joi.number().required()
    });

    return schema.validate(data);
}

// Remove Food validation
const removeFoodValidation = data =>
{
    const schema = Joi.object({
        _id: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.addFoodValidation = addFoodValidation;
module.exports.getFoodsValidation = getFoodsValidation;
module.exports.removeFoodValidation = removeFoodValidation;