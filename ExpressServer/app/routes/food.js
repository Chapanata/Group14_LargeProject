// food.js

const router                = require('express').Router();
const { addFoodValidation }   = require('../validation');

const verify = require('./verifyToken');

// Pull the user model from its directory
var User = require(appRoot + '/models/User');
var Consumed = require(appRoot + '/models/Consumed');


  //-----------------------------//
 //        addFood API          //
//-----------------------------//
router.route('/addFood')

    // create a food entry pointing to the user from the session token
    .post(verify, function(req, res)
    {
        // Validate entry
        const {error} = addFoodValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }
        
        // Instantiate the new user
        var consumed = new Consumed();
        consumed.foodId = req.body.foodId;
        consumed.energy = req.body.energy;
        consumed.totalFat = req.body.totalFat;
        consumed.saturates = req.body.saturates;
        consumed.carbs = req.body.carbs;
        consumed.totalSugars = req.body.totalSugars;
        consumed.protein = req.body.protein;
        consumed.salt = req.body.salt;
        
        // Find the user from the verifyToken user_id
        User.findOne( { '_id': req.user._id}, function(err, dbUser)
        {
            // Check if user found
            if (!dbUser)
            {
                console.log('User does not exist');
                res.json({Error: "User does not exist"});
                return;
            }

            // Check the user is confirmed
            if (!dbUser.confirmed)
            {
                console.log('User NOT confirmed');
                res.json({ Error: 'User NOT Confirmed' });
                return;
            }

            // Assingn this user to the new consumed object
            consumed.user = dbUser;

            // Add consumed to the database
            consumed.save(function(err)
            {
                // Add the new consumed to the user and save it
                dbUser.consumed.push(consumed);
                dbUser.save();
                
                // Success!
                res.json({Success: 'true'});
                return;
            });
        });
    });
module.exports = router;