// auth.js

const router                = require('express').Router();
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const { registerValidation, 
    loginValidation }       = require('../validation');


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
        user.name = req.body.name;

        // Generate a random 4 digit confirmation code
        user.confirmCode = Math.floor(1000 + Math.random() * 9000);

        // Make sure all parameters are filled out. 
        if (user.email == null || req.body.password == null || user.name == null)
        {
            res.json({Error: 'Missing Parameters'});
            return;
        }        

        // Make sure a valid email is entered
        const {error} = registerValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        // Check if the email already exists in the collection
        User.findOne( { 'email': user.email}, async function(err, dbUser)
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

            // If it passes the two error checks, hash the password and save.
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPass;

            user.save(function(err)
            {
                if (err)
                    res.send(err);

                res.json({Success: 'true'});
            });
        });
    });

  //-----------------------------//
 //         login API           //
//-----------------------------//
router.route('/login')

    // log a user in (accessed at POST http://localhost:8080/login)
    .post(async function(req, res)
    {
        var user = new User();

        var inputEmail = req.body.email;
        var inputPassword = req.body.password;

        // Make sure all parameters are filled out. 
        if (inputEmail == null || inputPassword == null)
        {
            res.json({Error: 'Missing Parameters'});
            return;
        }        

        // Make sure a valid email is entered
        const {error} = loginValidation(req.body);
        if (error)
        {
            res.json({Error: error.details[0].message});
            return;
        }

        User.findOne( { 'email': inputEmail }, async function(err, dbUser)
        {
            // Check if the email exists in the system
            if (!dbUser)
            {
                console.log('Incorrect Email Or Password');
                res.json({Error: 'Incorrect Email Or Password'});
                return;
            }

            // Check if the password matches the given email
            const passMatch = await bcrypt.compare(
                req.body.password, dbUser.password);

            if (!passMatch)
            {
                console.log("oh noes");
                res.json({Error: 'Incorrect Email Or Password'});
                return;
            }

            // Create a session token for the user
            const token = jwt.sign({_id: dbUser._id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token);

            // Assign the session token to the user
            User.updateOne( 
                { '_id': dbUser.id }, 
                { $set: { sessionToken: token } },
                function(err, res)
                {
                    if (err)
                        res.send(err);
                });

            // Send the JSON with the user's information and token.
            res.json(
                {
                    UserID: dbUser._id,
                    SessionToken: token,
                    Name: dbUser.name
            });
        });
    });

module.exports = router;