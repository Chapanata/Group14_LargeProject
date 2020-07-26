// food.js

const router                = require('express').Router();
const { addFoodValidation,
        getFoodsValidation,
        getDeficienciesValidation,
        removeFoodValidation }   = require('../validation');

var nutritionCalculator = require('../nutritionCalculator');
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
        consumed.date = req.body.date;
        consumed.quantity = req.body.quantity;
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
                console.log('User not confirmed');
                res.json({ Error: 'User not confirmed' });
                return;
            }

            // Assingn this user to the new consumed object
            consumed.user = dbUser;

            // Add consumed to the database
            consumed.save(function(err)
            {
                if (error)
                {
                    res.json({Error: error.details[0].message});
                    return;
                }

                // Add the new consumed to the user and save it
                dbUser.consumed.push(consumed);
                dbUser.save(function(err)
                {
                    if(err)
                    {
                        // Failed!
                        res.json({Success: 'false'});
                        return;
                    }
                        
                    // Success!
                    res.json({Success: 'true'});
                    return;
                });
                
            });
        });
    });


  //-----------------------------//
 //       removeFood API        //
//-----------------------------//
router.route('/removeFood')

    // create a food entry pointing to the user from the session token
    .post(verify, function(req, res)
    {
        // Validate entry
        const {error} = removeFoodValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }
        
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
                console.log('User not confirmed');
                res.json({ Error: 'User not confirmed' });
                return;
            }
            
            // Remove the entry from the user based on the given _id
            dbUser.consumed = dbUser.consumed.filter(obj => obj._id != req.body._id);
            dbUser.save();

            // Drop from the database
            Consumed.deleteOne( {"_id" : req.body._id }, function(err) 
            {
                if(err)
                {
                    res.json({Success: 'false'});
                    return;
                }

                res.json({Success: 'true'});
                return;
            } );
        });
    });


  //-----------------------------//
 //        getFoods API         //
//-----------------------------//
router.route('/getFoods')

    // create a food entry pointing to the user from the session token
    .post(verify, function(req, res)
    {
        // Validate entry
        const {error} = getFoodsValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        // Find the user from the verifyToken user_id
        User.findOne( { '_id': req.user._id} ).populate( { path: 'consumed', model: 'Consumed'} ).exec(function(err, dbUser)
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
                console.log('User not confirmed');
                res.json({ Error: 'User not confirmed' });
                return;
            }

            // Filter consumed array to only include from right now to dayCount provided
            dateCheck = new Date(req.body.date);
            dateCheck.setHours(0,0,0,0);
            dateCheckCompare = new Date(req.body.date);
            dateCheck.setHours(0,0,0,0);
            dateCheckCompare.setDate(dateCheck.getDate() + 1);
            res.json(dbUser.consumed.filter((obj) => obj.date.getTime() >= dateCheck.getTime() && obj.date.getTime() <= dateCheckCompare.getTime()));
            return;
        });
    });

  //-----------------------------//
 //     getDeficiencies API     //
//-----------------------------//
router.route('/getDeficiencies')

    // create a food entry pointing to the user from the session token
    .post(verify, function(req, res)
    {
        // Validate entry
        const {error} = getDeficienciesValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        // Find the user from the verifyToken user_id
        User.findOne( { '_id': req.user._id} ).populate( { path: 'consumed', model: 'Consumed'} ).exec(function(err, dbUser)
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
                console.log('User not confirmed');
                res.json({ Error: 'User not confirmed' });
                return;
            }


            // Filter consumed array to only include from right now to dayCount provided
            dateCheck = new Date(req.body.date);
            dateCheck.setHours(0,0,0,0);
            dateCheckCompare = new Date(req.body.date);
            dateCheck.setHours(0,0,0,0);
            dateCheckCompare.setDate(dateCheck.getDate() + 1);
            dbUser.consumed = (dbUser.consumed.filter((obj) => obj.date.getTime() >= dateCheck.getTime() && obj.date.getTime() <= dateCheckCompare.getTime()));

            var deficiencies = 
            {
               energy: nutritionCalculator.getEnergy(dbUser),
               totalFat: nutritionCalculator.getTotalFat(dbUser),
               saturates: nutritionCalculator.getSaturates(dbUser),
               carbs: nutritionCalculator.getCarbs(dbUser),
               totalSugars: nutritionCalculator.getTotalSugars(dbUser),
               protein: nutritionCalculator.getProtein(dbUser),
               salt: nutritionCalculator.getSalt(dbUser)
            };
            // Success!
            res.json(deficiencies);
            return;
        });
    });
    
module.exports = router;
