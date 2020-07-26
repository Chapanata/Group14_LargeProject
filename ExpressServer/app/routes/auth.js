// auth.js

const router                = require('express').Router();
const bcrypt                = require('bcryptjs');
const jwt                   = require('jsonwebtoken');
const { registerValidation, 
        loginValidation,
        confirmValidation } = require('../validation');

// const verify = require('./verifyToken');


// Pull the user model from its directory
var User = require(appRoot + '/models/User');


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
                res.json({Error: 'User Already Exists'});
                return;
            }

            // The following code links the API to email.js 
            // and supplies it with the information required. 
            const getName   = () => { return user.name; };
            const getEmail  = () => { return user.email; };
            const getCode   = () => { return user.confirmCode; };

            module.exports.getName = getName;
            module.exports.getEmail = getEmail;
            module.exports.getCode = getCode;

            var email = require('../email');

            // Send the confirmation email.
            let promise = new Promise((resolve, reject) => 
            {
                let didSend = email.sendEmail();
                if (didSend)
                    resolve();
                else
                    reject();
            })
            
            // If the promise resolves, then the email sent.
            promise.then(async () => 
            {
                console.log("Email has been sent!");

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
            })

            // If an error is caught, that means the email did not send.
            .catch(() =>
            {
                res.json({Error: 'Unable To Send Email'});
                return;
            })
        });
    });

  //-----------------------------//
 //      Confirmation API       //
//-----------------------------//
router.route('/confirmCode/:email/:confirmCode')
    // get the user with the given email and check
    // if the confirmCode matches the account
    .get(function(req, res)
    {
        // Make sure the parameters aren't empty
        if (req.params.email == null || req.params.confirmCode == null)
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

        User.findOne( { 'email': req.params.email}, function(err, dbUser)
        {
            // Check if the email exists in the system
            if (!dbUser)
            {
                res.json({Error: 'Email does not exist'});
                return;
            }

            // Check if the user is confirmed
            if (dbUser.confirmed)
            {
                res.json({ Error: 'User Already Confirmed' });
                return;
            }

            // Check that the code matches the user's code
            if (req.params.confirmCode != dbUser.confirmCode)
            {
                res.json({ Success: "false" });
                return;
            }
            else
            {
                // Set user's account to active
                User.updateOne( 
                    { '_id': dbUser.id }, 
                    { $set: { confirmed: true } },
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


  //-----------------------------//
 //         login API           //
//-----------------------------//
router.route('/login')

    // log a user in (accessed at POST http://localhost:8080/login)
    .post(async function(req, res)
    {
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
                res.json({Error: 'Incorrect Email Or Password'});
                return;
            }

            // Check if the password matches the given email
            const passMatch = await bcrypt.compare(
                req.body.password, dbUser.password);

            if (!passMatch)
            {
                res.json({Error: 'Incorrect Email Or Password'});
                return;
            }

            if (!dbUser.confirmed)
            {
                res.json({Error: 'Account Not Confirmed'});
                return;
            }

            // Create a session token for the user
            const token = jwt.sign(
                { _id: dbUser._id,
                  name: dbUser.name },
                 process.env.TOKEN_SECRET,
                 { expiresIn: '3d' });

            // Send the token to the header
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
