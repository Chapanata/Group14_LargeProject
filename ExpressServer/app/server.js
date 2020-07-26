// server.js

// BASE setup
///////////////////////////////////////////////////////////////////////////////

// Call the packages that we need
var express     = require('express');       // call express
var app         = express();                // define app using express
var cors        = require('cors');          // used for HTTP requests
var bodyParser  = require('body-parser');   // used for HTTP verbs
var mongoose    = require('mongoose');      // mongoose for the database
var dotenv      = require('dotenv');        // dotenv to store env variables

// Configure dotenv
dotenv.config({path:'app/.env'});

// Get a path to the application
var path = require('path');
global.appRoot = path.resolve(__dirname);

// Configure CORS to enable all requests
app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(port, function () {
  console.log('CORS-enabled web server listening on port ' + port)
})

// Configure app to use bodyParser()
// This lets us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize the environmental variables
dotenv.config();

// Connect to the database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, db) 
    {
        if (err) {
            console.log('Unable to connect to the database. Error:', err);
        } else {
            console.log('Connected to Database successfully!');
        }
    });

var port = process.env.PORT || 8080; // set the port

// ROUTES FOR OUR API
///////////////////////////////////////////////////////////////////////////////

// Route for authentication: Deals with registration and login
const authRoute = require('./routes/auth');
// Route for passwords: Deals with forgot and reset password
const passRoute = require('./routes/pass');
// Route for user: Deals with editing user info and BMI info
const userRoute = require('./routes/editUser');
// Route for food: Deals with food calls
const foodRoute = require('./routes/food');

// Route Middlewares
// if we want a prefix (such as '/user/register', uncomment the below line:
// app.use('/user', authRoute);
app.use('', authRoute);
app.use('', passRoute);
app.use('', userRoute);
app.use('', foodRoute);

//START THE SERVER
///////////////////////////////////////////////////////////////////////////////

app.listen(port);
console.log('Starting on port ' + port);

module.exports = app;
