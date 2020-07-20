// server.js

// BASE setup
///////////////////////////////////////////////////////////////////////////////

// Call the packages that we need
var express     = require('express');       // call express
var app         = express();                // define app using express
var bodyParser  = require('body-parser');   // used for HTTP verbs
var mongoose    = require('mongoose');      // mongoose for the database
var dotenv      = require('dotenv');        // dotenv to store env variables

// Configure dotenv
dotenv.config({path:'app/.env'});

// Get a path to the application
var path = require('path');
global.appRoot = path.resolve(__dirname);

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
// Route for food: Deals with food calls
const foodRoute = require('./routes/food');

// Route Middlewares
// if we want a prefix (such as '/user/register', uncomment the below line:
// app.use('/user', authRoute);
app.use('', authRoute);
app.use('', foodRoute);

//START THE SERVER
///////////////////////////////////////////////////////////////////////////////

app.listen(port);
console.log('Starting on port ' + port);