// getBio.js

const router = require('express').Router();
const verify = require('./verifyToken');

// Pull the user model from its directory
var User = require(appRoot + '/models/User');

  //-----------------------------//
 //     get biometrics API      //
//-----------------------------//
router.route('/getBio')

    // Get the user's biometric information
    // accessed at GET http://localhost:8080/getBio
    .get(verify, function(req, res)
    {
        userID = req.user._id;

        User.findOne( { '_id': userID }, function(err, dbUser)
        {
            if (dbUser == null)
            {
                console.log("Bad token. User does not exist.");
                res.json({ Error: 'Internal Error. Log In Again.' });
                return;
            }

            // If any of the fields are null in the db, we want to make
            // sure that the json returns a variable with a null value.
            if (dbUser.weight == null)
                var weight = null;
            if (dbUser.gender == null)
                var gender = null;
            if (dbUser.heightFeet == null)
                var heightFeet = null;
            if (dbUser.heightInch == null)
                var heightInch = null;
            if (dbUser.bmi == null)
                var bmi = null;

            res.json(
                {
                    weight: weight,
                    gender: gender,
                    heightFeet: heightFeet,
                    heightInch: heightInch,
                    bmi: bmi                
                }
                    ); 
        });
    });

module.exports = router;