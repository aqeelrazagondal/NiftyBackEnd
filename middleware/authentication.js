const jwt = require('jsonwebtoken');

const config = require('../config/config');

function userAuth(req, res, next) {
    console.log('req.body');
    console.log(req.body);
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({ response: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).json({
            response: false,
            message: 'No token provided!'
        });
    }
}

module.exports = userAuth;