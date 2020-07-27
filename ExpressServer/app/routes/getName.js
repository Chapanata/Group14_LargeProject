// getName.js

const router = require('express').Router();
const verify = require('./verifyToken');

// Pull the user model from its directory
var User = require(appRoot + '/models/User');

  //-----------------------------//
 //     get biometrics API      //
//-----------------------------//
router.route('/getName')

    // Get the user's name
    // accessed at GET http://localhost:8080/getName
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

            res.json({ name: req.user.name });
        });
    });

module.exports = router;
