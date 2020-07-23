// editUser.js

const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

// Pull the user model from its directory
var User = require(appRoot + '/models/User');

  //-----------------------------//
 //       edit name API         //
//-----------------------------//
router.route('/editUser/name')

    // edit a user's name (accessed at POST http://localhost:8080/editUser/name)
    .post(verify, function(req, res)
    {
        var inputName = req.body.name;
        var inputConfirmName = req.body.nameConfirm;

        // Check if the parameters are filled
        if (inputName == null || inputConfirmName == null)
        {
          res.json({ Error: 'Missing Parameters' });
          return;
        }

        // Make sure the confirm matches the initial input
        if (inputName != inputConfirmName)
        {
          res.json({ Error: 'Input Does Not Match' });
          return;
        }

        const userID = jwt.decode(req.header('auth-token'))._id;

        // Store the updated name into the database
        User.findOne( { '_id': userID }, function(err, dbUser)
        {
          User.updateOne(
            { '_id': userID },
            { $set: {name: inputName } },
            function(err, res)
            {
              if (err)
                console.log(err);
            });

              res.json({ Success: 'true' }); 
        });
      });

  //-----------------------------//
 //     edit password API       //
//-----------------------------//
router.route('/editUser/password')
    // edit a user's password 
    // (accessed at POST http://localhost:8080/editUser/password)
    .post(verify, async function(req, res)
    {
        var inputPass = req.body.password;
        var inputConfirmPass = req.body.passwordConfirm;

        // Check if the parameters are filled
        if (inputPass == null || inputConfirmPass == null)
        {
          res.json({ Error: 'Missing Parameters' });
          return;
        }

        // Make sure the confirm matches the initial input
        if (inputPass != inputConfirmPass)
        {
          res.json({ Error: 'Input Does Not Match' });
          return;
        }

        const userID = jwt.decode(req.header('auth-token'))._id;

        // Generate a new hash for the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(inputPass, salt);

        // Store the updated hashed password into the database
        User.findOne( { '_id': userID }, function(err, dbUser)
        {
          User.updateOne(
            { '_id': userID },
            { $set: {password: hashedPass } },
            function(err, res)
            {
              if (err)
                console.log(err);
            });

            res.json({ Success: 'true' }); 
        });
      });

  //-----------------------------//
 //     edit physical API       //
//-----------------------------//
router.route('/editUser/physical')

    // Edit a user's recorded physical traits
    // (accessed at POST http://localhost:8080/editUser/physical)
    .post(verify, function(req, res)
    {
        const gender  = req.body.gender;
        const weight  = parseInt(req.body.weight, 10);
        const heightFeet    = parseInt(req.body.heightFeet, 10);
        const heightInch    = parseInt(req.body.heightInch, 10);

        // Check if the parameters are filled
        if (gender == null || weight == null || 
            heightFeet == null || heightInch == null)
        {
            res.json({ Error: 'Missing Parameters' });
            return;
        }

        // Calculate the BMI
        var totalInch = heightInch + (heightFeet * 12);
        var bmi = (weight / (totalInch * totalInch)) * 703;
        bmi = Math.round(bmi * 10) / 10;

        const userID = jwt.decode(req.header('auth-token'))._id;

        // Add the information to the user in the database
        User.updateOne( 
            { '_id': userID }, 
            { $set: 
                { 
                    gender: gender,
                    weight: weight,
                    heightFeet: heightFeet,
                    heightInch: heightInch,
                    bmi: bmi
                 } 
            },
            function(err, res)
            {
                if (err)
                    res.send(err);
        });

        res.json({ Success: "true" });
        return;
    });


module.exports = router;