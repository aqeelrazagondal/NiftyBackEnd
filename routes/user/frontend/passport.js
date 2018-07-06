const express = require('express');
const http = require('http');
const passport = require('passport');
const multer = require("multer");
const multipart = multer();

const passportRouter = express.Router();
const handler = require('../../../handlers/user/frontend/passport');

//////////Facebook authentication////////////
passportRouter.get('/auth/facebook', multipart.fields([]), function (req, res, next) {
    console.log('/auth/facebook');
    passport.authenticate('facebook', {
        scope: ['email'],
        state: req.query.token
    })(req, res, next);
});

/////////Google Authentication//////////////
passportRouter.get('/auth/google', multipart.fields([]), function (req, res, next) {
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        state: req.query.token
    })(req, res, next);
});

/////////////Callbacks for both strategies//////////////
// handle the callback after facebook has authenticated the user
passportRouter.get('/auth/facebook/callback', multipart.fields([]), handler.facebookCallback);

//The callback after google has authenticated the user
passportRouter.get('/auth/google/callback', multipart.fields([]), handler.googleCallback);

module.exports = passportRouter;