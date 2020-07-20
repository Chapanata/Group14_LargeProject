// food.js

const router                = require('express').Router();
const { registerValidation, 
        loginValidation,
        confirmValidation }   = require('../validation');


// Pull the user model from its directory
var User = require('../models/user');
var Consumed = require('../models/consumed');


  //-----------------------------//
 //        register API         //
//-----------------------------//
router.route('/addFood')

    // create a user (accessed at POST http://localhost:8080/register)
    .post(function(req, res)
    {
        res.json({Error: 'Not implemented'});
        return;
    });
module.exports = router;