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

const emailActivate = {
    from: "Nutrition Manager, aaron.k.koo@gmail.com",
    to: auth.userEmail,
    subject: "Nutrition App Account Verification",
    text: `Hello ${ auth.userName }, Your account has been created and requires activation. Go to the following link to finish your registration:

    https://www.website.com/confirmCode/${auth.userEmail}/${auth.confirmCode}`,
    html: `Hello<strong> ${
    auth.userName
    }</strong>,<br><br>Your account has been created and requires activation. Go to the following link to finish your registration:

    https://www.website.com/confirmCode/${auth.userEmail}/${auth.confirmCode}`
    };

    module.exports = {
        client: client,
        emailActivate: emailActivate
    };