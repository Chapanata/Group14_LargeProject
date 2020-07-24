//email.js

const auth = require('./routes/auth');
const pass = require('./routes/pass');

// > npm install --save @sendgrid/mail
// > npm install nodemailer-sendgrid-transport

const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const options = {
    auth: {
        api_user: process.env.API_USER_INFO,
        api_key: process.env.API_KEY_INFO
    }
};
const client = nodemailer.createTransport(sgTransport(options));

const sendEmail = async () =>
{
    var emailActivate = {
        from: "Nutrition Manager, nutritionmanagerdeluxe@gmail.com",
        to: auth.getEmail(),
        subject: "Nutrition App Account Verification",
        text: `Hello ${ auth.getName() }, Your account has been created and requires activation. Go to the following link to finish your registration:
    
        https://nutrition-deluxe.herokuapp.com/confirmCode/${auth.getEmail()}/${auth.getCode()}`,
        html: `Hello<strong> ${
        auth.getName()
        }</strong>,
        <br>
        <br>Your account has been created and requires activation. Go to the following link to finish your registration:
        <br>
        https://nutrition-deluxe.herokuapp.com/confirmCode/${auth.getEmail()}/${auth.getCode()}`
        };

    client.sendMail(emailActivate, function(err, info)
    {
        if (err)
        {
            console.log(err);
            return false;
        }
        else
        {
            return true;
        }
    });
};

const sendForgotEmail = async () =>
{
    var forgotEmail = {
        from: "Nutrition Manager, nutritionmanagerdeluxe@gmail.com",
        to: pass.getEmail(),
        subject: "Nutrition App Account Password Reset",
        text: `Hello ${ pass.getName() }, somebody has recently requested to reset the password of the account associated with this email. If this was not you, ignore this email and change your password.
        
        If it was you, then proceed to this link to reset your password:
    
        https://nutrition-manager-deluxe.herokuapp.com/resetPassword/${pass.getEmail()}/${pass.getCode()}`,
        html: `Hello<strong> ${
            pass.getName()
        }</strong>,
        <br>
        <br>
        somebody has recently requested to reset the password of the account associated with this email. If this was not you, ignore this email and change your password.
        <br>
        If it was you, then proceed to this link to reset your password:
    
        https://nutrition-manager-deluxe.herokuapp.com/resetPassword/${pass.getEmail()}/${pass.getCode()}`
        };

    client.sendMail(forgotEmail, function(err, info)
    {
        if (err)
        {
            console.log(err);
            return false;
        }
        else
        {
            return true;
        }
    });
};

    module.exports = {
        sendEmail: sendEmail,
        sendForgotEmail: sendForgotEmail
    };