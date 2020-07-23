//email.js

const auth = require('./routes/auth');

// > npm install --save @sendgrid/mail
// > npm install nodemailer-sendgrid-transport

const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const options = {
    auth: {
        api_user: 'aaronkkoo',
        api_key: 'q1w2e3r4t5'
    }
};
const client = nodemailer.createTransport(sgTransport(options));

var failedSend;

const sendEmail = async () =>
{
    var emailActivate = {
        from: "Nutrition Manager, aaron.k.koo@gmail.com",
        to: auth.getEmail(),
        subject: "Nutrition App Account Verification",
        text: `Hello ${ auth.getName() }, Your account has been created and requires activation. Go to the following link to finish your registration:
    
        https://nutrition-heroku.herokuapp.com/confirmCode/${auth.getEmail()}/${auth.getCode()}`,
        html: `Hello<strong> ${
        auth.getName()
        }</strong>,<br><br>Your account has been created and requires activation. Go to the following link to finish your registration:
    
        https://nutrition-heroku.herokuapp.com/confirmCode/${auth.getEmail()}/${auth.getCode()}`
        };

    client.sendMail(emailActivate, async function(err, info)
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
        failedSend: failedSend
    };