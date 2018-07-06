const passport = require('passport');

const redirectUrl = 'http://www.niftyhub.com?redirect=1';

//Handler to handle the route for facebook callback
let facebookCallback = function (req, res, next) {
    passport.authenticate('facebook', function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (user.login) {
            console.log('USER LOGIN ', user);
            res.redirect(redirectUrl + '?userId=' + user.userId + "&token="+ user.token);
        } else {
            //Url to redirect the user
            res.redirect(redirectUrl);
            
        }
    })(req, res, next);
}

//Handler to handle the route for google callback
let googleCallback = function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (user.login) {
            res.redirect(redirectUrl + '?userId=' + user.userId + "&token="+ user.token);            
        } else {
            //Url to redirect the user
            res.redirect(redirectUrl);
        }
    })(req, res, next);
}
module.exports = {
    facebookCallback,
    googleCallback
}