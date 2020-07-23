// pass.js

const router                    = require('express').Router();
const bcrypt                    = require('bcryptjs');
const { forgotPassValidation,
        confirmValidation }     = require('../validation');

// const forgotPassValidation = require('../validation');

// Pull the user model from its directory
var User = require(appRoot + '/models/User');


  //-----------------------------//
 //    forgot password API      //
//-----------------------------//
router.route('/forgotPassword')

    // Send a password reset email 
    // (accessed at POST http://localhost:8080/forgotPassword)
    .post(function(req, res)
    {
        var inputEmail = req.body.email;

        if (inputEmail == null)
        {
            res.json({Error: 'Missing Parameters'});
            return;
        }       
        
        const {error} = forgotPassValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        User.findOne( { 'email': inputEmail }, function(err, dbUser)
        {
            // Check if the email exists in the system
            if (!dbUser)
            {
                console.log('Email does not exist in the system');
                res.json({Error: 'User does not exist'});
                return;
            }

            // Check if the user has been confirmed
            if (!dbUser.confirmed)
            {
                console.log('User not confirmed');
                res.json({Error: 'User not confirmed'});
                return;
            }

            // Generate a confirmation code
            newCode = Math.floor(1000 + Math.random() * 9000);

            const getName   = () => { return dbUser.name; };
            const getEmail  = () => { return inputEmail; };
            const getCode   = () => { return newCode; };

            module.exports.getName = getName;
            module.exports.getEmail = getEmail;
            module.exports.getCode = getCode;

            var email = require('../email');

            let promise = new Promise((resolve, reject) =>
            {
                let didSend = email.sendForgotEmail();
                if (didSend)
                    resolve();
                else
                    reject();
            })

            // If the promise resolves, then the email sent.
            promise.then(() =>
            {
                console.log("Email has been sent!");

                // If it passes the error checks, save the code to the user
                User.updateOne( 
                    { '_id': dbUser.id }, 
                    { $set: { confirmCode: newCode } },
                    function(err, res)
                    {
                        if (err)
                            res.send(err);
                });

                res.json({Success: 'true'});
            })

            // If an error is caught, that means the email did not send.
            .catch(() =>
            {
                console.log("Could not send email!");
                res.json({Error: 'Unable To Send Email'});
                return;
            })
        });
    });

  //-----------------------------//
 //     reset password API      //
//-----------------------------//
router.route('/resetPassword/:email/:confirmCode')

    // Send a password reset email 
    // (accessed at POST http://localhost:8080/resetPassword/email/confirmCode)
    .post(function(req, res)
    {
        // Make sure the parameters aren't empty
        if (req.params.email == null || req.params.confirmCode == null || req.body.password == null)
        {
            res.json({Error: 'Missing Parameters'});
            return;
        }

        // Make sure a valid email is entered
        const {error} = confirmValidation(req.params);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        User.findOne( { 'email': req.params.email}, async function(err, dbUser)
        {
            // Check if the email exists in the system
            if (!dbUser)
            {
                console.log('User does not exist');
                res.json({Error: 'User does not exist'});
                return;
            }

            // Check if the user is confirmed
            if (!dbUser.confirmed)
            {
                console.log('User not confirmed');
                res.json({ Error: 'User not confirmed' });
                return;
            }

            // Check that the code matches the user's code
            if (req.params.confirmCode != dbUser.confirmCode)
            {
                console.log("Code does not match");
                res.json({ Success: "false" });
                return;
            }
            else
            {
                console.log("Codes match. Resetting Password");

                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(req.body.password, salt);

                // Set user's account to active
                User.updateOne( 
                    { '_id': dbUser.id }, 
                    { $set: { password: hashedPass } },
                    function(err, res)
                    {
                        if (err)
                            res.send(err);
                });

                res.json({ Success: "true" });
                return;
            }
        });
    });

module.exports = router;