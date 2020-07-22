// verifyToken.js

const jwt = require('jsonwebtoken');
const router = require('./auth');

module.exports = function(req, res, next)
{
    const token = req.header('auth-token');
    if (!token) 
        return res.status(401).json({ Error: 'Token Missing' });

    try
    {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err)
    {
        res.status(400).json({ Error: 'Token Not Valid' } );
    }
}

// In order to use this API, do the following:
//
// First include "const verify = require('./verifyToken')" in the header
//      **  The path inside require() may change depending on
//          the location of your file that you're working on.
//
// From there, all you have to do is include "verify" in the middleware.
//
// For example, say you have an API GET call that looks like:
// "router.route('/login').post(function(req, res)"
//
// In order to insert the verify middleware, you would change it to look like:
// "router.route('/login').post(verify, function(req, res)"