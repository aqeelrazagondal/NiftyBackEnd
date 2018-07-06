// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');
const decode = require('jwt-decode')

const config = require('../../../config/config');

// load the auth variables
const configAuth = require('../../../config/oauth');
const model = require('../../../models/user/frontend/strategies');

module.exports = function (passport) {
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name'],
        passReqToCallback: true
    }, function (req, token, refreshToken, profile, done) {
        let jwtToken;
        let decoded;
        let userId;
        if (req.query) {
            //Jwt token if the request is sent by an authenticated user
            jwtToken = req.query.state;
        }
        // asynchronous
        process.nextTick(function () {
            if (jwtToken) {
                decoded = decode(jwtToken);
                userId = decoded.userId;
                model.checkUser(userId, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user.length) {
                        // find the user in the database based on their facebook id
                        model.addUserSocialMedia(profile.id, userId, token, 'facebook', function (err, userSocialMediaResponse) {
                            if (err) {
                                if (err.code === "ER_DUP_ENTRY") {
                                    return done(null, {
                                        message: 'This facebook account is already attached with another user account.',
                                        login: true
                                    });
                                }
                                return done(err);
                            }
                            if (userSocialMediaResponse.affectedRows) {
                                return done(null, {
                                    response: 'User account connected successfully.', login: true
                                });
                            }
                        });
                    } else {
                        return done(null, { message: 'Something went wrong at checking user for registration.' })
                    }
                });

            } else {
                // find the user in the database based on their facebook id
                model.userwithSocialMediaId(profile.id, function (err, successReponse) {
                    let response = {};
                    let payload;
                    if (err) {
                        return done(err);
                    }
                    if (successReponse.length) {
                        response.userId = successReponse[0].fk_users_id;
                        response.message = 'user logged in successfully.';
                        payload = {
                            userId: response.userId
                        };
                        token = jwt.sign(payload, config.secret, {
                            // expiresIn : 60 // expires in seconds
                        });
                        response.token = token;
                        response.login = true;
                        return done(null, response);
                    } else {
                        model.addUser(profile.name.givenName,
                            profile.name.familyName, profile.emails[0].value, function (err, adduserResponse) {
                                if (err) {
                                    return done(err);
                                }
                                if (adduserResponse.affectedRows) {
                                    model.addUserSocialMedia(profile.id, adduserResponse.insertId, token, 'facebook', function (err, userSocialMediaResponse) {
                                        let user = {};
                                        if (err) {
                                            return done(err);
                                        }
                                        if (userSocialMediaResponse.affectedRows) {
                                            user.userId = adduserResponse.insertId
                                            user.message = 'User registered successfully.'
                                            return done(null, user);
                                        } else {
                                            return done(null, {
                                                message: 'Something went wrong.'
                                            });
                                        }
                                    });
                                }
                            });
                    }
                });
            }
        });

    }));


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        profileFields: ['profile', 'email'],
        passReqToCallback: true
    }, function (req, token, refreshToken, profile, done) {
        let jwtToken;
        let decoded;
        let userId;
        // asynchronous
        process.nextTick(function () {
            if (req.query) {
                //Jwt token if the request is sent by an authenticated user
                jwtToken = req.query.state;
            }
            if (jwtToken) {
                decoded = decode(jwtToken);
                userId = decoded.userId;
                model.checkUser(userId, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user.length) {
                        // find the user in the database based on their google id
                        model.addUserSocialMedia(profile.id, userId, token, 'google', function (err, userSocialMediaResponse) {
                            if (err) {
                                if (err.code === "ER_DUP_ENTRY") {
                                    return done(null, {
                                        message: 'This google account is already attached with another user account.',
                                        login: true
                                    });
                                }
                                return done(err);
                            }
                            if (userSocialMediaResponse.affectedRows) {
                                return done(null, {
                                    response: 'User account connected successfully.', login: true
                                });
                            }
                        });

                    } else {
                        return done(null, { message: 'Something went wrong at checking user for registration.' })
                    }
                });

            } else {
                // find the user in the database based on their google id
                model.userwithSocialMediaId(profile.id, function (err, successReponse) {
                    let response = {};
                    let payload;
                    if (err) {
                        return done(err);
                    }
                    if (successReponse.length) {
                        response.userId = successReponse[0].fk_users_id;
                        response.message = 'user logged in successfully.';
                        payload = {
                            userId: response.userId
                        };
                        token = jwt.sign(payload, config.secret, {
                            // expiresIn : 60 // expires in seconds
                        });
                        response.token = token;
                        response.login = true;
                        return done(null, response);
                    } else {
                        model.addUser(profile.name.givenName,
                            profile.name.familyName, profile.emails[0].value, function (err, adduserResponse) {
                                if (err) {
                                    return done(err);
                                }
                                if (adduserResponse.affectedRows) {
                                    model.addUserSocialMedia(profile.id, adduserResponse.insertId, token, 'google', function (err, userSocialMediaResponse) {
                                        let user = {};
                                        if (err) {
                                            return done(err);
                                        }
                                        if (userSocialMediaResponse.affectedRows) {
                                            user.userId = adduserResponse.insertId
                                            user.message = 'User registered successfully.'
                                            return done(null, user);
                                        } else {
                                            return done(null, {
                                                message: 'Something went wrong.'
                                            });
                                        }
                                    });
                                }
                            });
                    }
                });
            }
        });
    }));
};