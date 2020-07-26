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
        User.findOne( { '_id': req.user._id }, function(err, dbUser)
        {
            if (dbUser == null)
            {
                console.log("Bad token. User does not exist.");
                res.json({ Error: 'Internal Error. Log In Again.' });
                return;
            }

            // If any of the fields are null in the db, we want to make
            // sure that the json returns a variable with a null value.
            // Otherwise, return the actual value from the database.
            var weight = dbUser.weight;
            if (dbUser.weight == null)
                var weight = null;

            var gender = dbUser.gender;
            if (dbUser.gender == null)
                var gender = null;

            var heightFeet = dbUser.heightFeet;
            if (dbUser.heightFeet == null)
                var heightFeet = null;

            var heightInch = dbUser.heightInch;
            if (dbUser.heightInch == null)
                var heightInch = null;

            var bmi = dbUser.bmi;
            if (dbUser.bmi == null)
                var bmi = null;

            res.json(
                {
                    weight: weight,
                    gender: gender,
                    heightFeet: heightFeet,
                    heightInch: heightInch,
                    bmi: bmi
                });
        });
    });

module.exports = router;
