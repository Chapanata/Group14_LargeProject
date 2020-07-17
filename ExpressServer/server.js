// server.js

// BASE setup
///////////////////////////////////////////////////////////////////////////////

// Call the packages that we need
var express     = require('express');       // call express
var app         = express();                // define app using express
var bodyParser  = require('body-parser');   // used for HTTP verbs
var mongoose    = require('mongoose');      // mongoose for the database

mongoose.connect('mongodb+srv://dbUser:password1234@cluster0.isrf6.mongodb.net/bearers?retryWrites=true&w=majority', { useNewUrlParser: true }, function(err, db) 
{
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

// Pull the user model from its directory
var User = require('./app/models/user');

// Configure app to use bodyParser()
// This lets us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set the port


// ROUTES FOR OUR API
///////////////////////////////////////////////////////////////////////////////

var router = express.Router();  // get an instance of the express 

// middleware to use for all requests
router.use(function(req, res, next)
{
    console.log('Something is happening!');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res)
    {
        res.json({ message: 'success' });
    });

// more routes for our API will happen here

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
            const getName   = () =>  { return user.name; };
            const getEmail  = () =>  { return user.email; };
            exports.getName = getName;
            exports.getEmail = getEmail;
            var email = require('./email');

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


// REGISTER OUR ROUTES
app.use('', router);

// if we want a prefix, uncomment the below line:
// app.use('/prefix_here', router);

//START THE SERVER
///////////////////////////////////////////////////////////////////////////////

app.listen(port);
console.log('Starting on port ' + port);