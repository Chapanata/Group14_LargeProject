// food.js

const router                = require('express').Router();
const { registerValidation, 
        loginValidation,
        confirmValidation }   = require('../validation');


// Pull the user model from its directory
var User = require('../app/models/user');
var Consumed = require('../app/models/consumed');


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