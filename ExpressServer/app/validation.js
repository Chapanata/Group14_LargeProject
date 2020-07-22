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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.confirmValidation = confirmValidation;


  //-----------------------------//
 //      Food Validation        //
//-----------------------------//

// Add Food validation
const addFoodValidation = data =>
{
    const schema = Joi.object({
        foodId: Joi.number().required(),
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
module.exports.addFoodValidation = addFoodValidation;