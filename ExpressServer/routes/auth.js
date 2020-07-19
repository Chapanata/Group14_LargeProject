const router = require('express').Router();

// Pull the user model from its directory
var User = require('../app/models/user');


  //-----------------------------//
 //        register API         //
//-----------------------------//
router.route('/register')

    // create a user (accessed at POST http://localhost:8080/register)
    .post(function(req, res)
    {
        // Instantiate the new user
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.name = req.body.name;

        // Generate a random 4 digit confirmation code
        user.confirmCode = Math.floor(1000 + Math.random() * 9000);

        // Make sure all parameters are filled out. 
        if (user.email == null || user.password == null || user.name == null)
        {
            res.json({Error: 'Missing Parameters'});
            return;
        }        

        // Check if the email already exists in the collection
        User.findOne( { 'email': user.email}, function(err, dbUser)
        {
            if (dbUser != null)
            {
                console.log("Email already exists!");
                res.json({Error: 'User Already Exists'});
                return;
            }

            // The following code links the API to email.js 
            // and supplies it with the information required. 
            module.exports = {
                userName: user.name,
                userEmail: user.email
            };


            var email = require('../email');

            // Send the confirmation email.
            var failedSend = false;
            email.client.sendMail(email.emailActivate, function(err, info)
            {
                if (err)
                    failedSend = true;
            });

            // Check if the email was sent. If there was a problem, return err.
            if (failedSend)
            {
                console.log("Could not send email!");
                res.json({Error: 'Unable To Send Email'});
                return;
            }

            // If it passes the two error checks, save the user into the db.
            user.save(function(err)
            {
                if (err)
                    res.send(err);

                res.json({Success: 'true'});
            });
        });
    });


module.exports = router;

