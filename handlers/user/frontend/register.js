const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const url = require("url");
const countries = require('country-list')();
const cities = require('cities-list');

const model = require("../../../models/user/frontend/register");
const helpers = require("../../../helpers/helpers");
const acl = require(".././../../acl/aclInMongoDB");

const emailLinkExpiry = 1000 * 60 * 10; //Set the duration after which the verification link will be expired

//Handler to handle the register request; adding a new user
let registerUser = function (req, res, next) {
  let randomString, host, email, link, mailOptions, userId;
  //////////////////////////Validations//////////////////////////////////////////

  ///////////Type Validations///////////
  //Check the types of the users_username
  
  if (typeof req.body.users_username !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_username is required as string."
    });
  }

  if (req.body.users_password === undefined) {
    return res.status(422).json({
      response: false,
      message: "users_password is required."
    });
  }

  if (req.body.user_email === undefined) {
    return res.status(422).json({
      response: false,
      message: "user_email is required"
    });
  }

  if (req.body.users_password === undefined) {
    return res.status(422).json({
      response: false,
      message: "users_password is required."
    });
  }

  /////////////Email validation//////////////////
  if (!validator.isEmail(req.body.user_email)) {
    return res.status(422).json({
      response: false,
      message: "Please provide a valid email address."
    });
  }

  ////////////Password Validations/////////////
  if (!helpers.isValidPassword(req.body.users_password)) {
    return res.status(422).json({
      response: false,
      message: `Password not valid: should be atleast 8 characters long
        and should contain uppercase,lowercase, number and special string`
    });
  }

  //Check the types of the users_type
  if (typeof req.body.users_type !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_type is not string"
    });
  }

  //Check the types of the users_type
  if (req.body.users_type === "vendor" || req.body.users_type === "customer") {
    /////////////////After successful validatons, Add user////////////////////
    model.registerUser(req.body, function (err, response) {
      // Check whether query run successful or not
      if (err) {
        //Is username already in use
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(422).json({
            response: false,
            message:
              `User already exist with username: ` + req.body.users_username
          });
        }
        return res.status(422).json({
          response: false,
          message: `not able to proccess query at addUser`
        });
      }

      if (response.insertId) {
        userId = response.insertId;
        //Assign roles to the user
        if (req.body.users_type === "vendor") {
          console.log('role assinged');
          acl.assignRole(userId, "vendor");
        } else if (req.body.users_type === "customer") {
          acl.assignRole(userId, "customer");
        }

        //A random string
        randomString = crypto.randomBytes(20).toString("hex");
        model.addToken(randomString, userId, "emailVerification", function (
          err,
          tokenResponse
        ) {
          if (err) {
            return console.log("not able to proccess query at addToken " + err);
          }
          //Set a duration of time and remove the token from database after that time
          setTimeout(function () {
            model.removeToken(userId, "emailVerification", function (
              err,
              removeTokenResponse
            ) {
              if (err) {
                return console.log(
                  "not able to proccess query at addToken " + err
                );
              }
              if (removeTokenResponse.affectedRows) {
                return console.log("Token removed from the database");
              }
              return console.log(removeTokenResponse);
            });
          }, emailLinkExpiry);
        });

        //Get current host
        host = req.get("host");
        //Construct link for the verification
        link = `http://${host}/users/verify/${userId}?id=${randomString}`;
        email = req.body.user_email;

        mailOptions = {
          to: email,
          subject: "Please verify your email to activate your account.",
          html: `Hello ${email},<br><br> Please Click the following link to verify your email address.<br><a href=${link}>Click here to verify</a>`
        };

        smtpTransport.sendMail(mailOptions, function (err, success) {
          if (err) {
            return res.status(500).json({
              response: false,
              message: "Failed to send email"
            });
          }
          return res.status(200).json({
            message: "User registered successfully.",
            emailSent: true,
            userId: response.insertId
          });
        });
      }
    });
  } else {
    return res.status(422).json({
      response: false,
      message: "User type must be vendor or customer"
    });
  }
};

//Handler for verify user API endpoint
let verify = function (req, res) {
  model.getToken(req.params.userId, "emailVerification", function (
    err,
    tokenResponse
  ) {
    if (tokenResponse.length !== 0) {
      let urlToken = url.parse(req.url, true).query.id;
      let dbToken = tokenResponse[0].TOKEN;
      if (err) {
        console.log(err);
      } else {
        if (urlToken === dbToken) {
          model.verifyEmail(req.params.userId, function (err, response) {
            if (err) {
              return res
                .status(500)
                .send("Sorry, not able to proccess your request at verify api");
            } else {
              model.removeToken(
                req.params.userId,
                "emailVerification",
                function (err, removeTokenResponse) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("token removed");
                  }
                }
              );
              return res.status(200).render(`emailConfirmation.jade`);
            }
          });
        } else {
          return res.status(403).render(`failedConfirmation.jade`);
        }
      }
    } else {
      return res.status(403).render(`failedConfirmation.jade`);
    }
  });
};

//Handler for API endpoint to resend email verification
let resendVerficationEmail = function (req, res) {
  let randomString, host, email, link, mailOptions, userId;

  if (req.body.user_email === undefined) {
    return res.status(422).json({
      response: false,
      message: "user_email is required"
    });
  }

  /////////////Email validation//////////////////
  if (!validator.isEmail(req.body.user_email)) {
    return res.status(422).json({
      response: false,
      message: "Email not valid"
    });
  }

  model.userExists(req.body.user_email, function (err, userExist) {
    if (!userExist.length) {
      return res.status(404).json({
        response: false,
        message: "User not found."
      });
    } else {
      model.checkEmailVerification(req.body.user_email, function (
        err,
        response
      ) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "not able to proccess query at checkEmailVerification"
          });
        }
        //Check whether the email has been already verified or not
        if (response[0].emailVerified) {
          return res.status(200).json({
            response: true,
            message: "Email already verified!"
          });
        } else {
          userId = response[0].users_id;
          model.getToken(userId, "emailVerification", function (
            err,
            tokenResponse
          ) {
            if (tokenResponse.length) {
              return res.status(200).json({
                response: true,
                message:
                  "Verification email has already been sent, please wait for 10 minutes for resending"
              });
            } else {
              //A random string
              randomString = crypto.randomBytes(20).toString("hex");
              model.addToken(
                randomString,
                userId,
                "emailVerification",
                function (err, tokenResponse) {
                  if (err) {
                    return console.log(err);
                  }
                  setTimeout(function () {
                    model.removeToken(userId, "emailVerification", function (
                      err,
                      removeTokenResponse
                    ) {
                      if (err) {
                        return console.log(err);
                      } else {
                        if (removeTokenResponse.affectedRows) {
                          return console.log("token removed");
                        }
                      }
                    });
                  }, emailLinkExpiry);
                }
              );

              host = req.get("host");
              link =
                `http://` +
                req.get("host") +
                `/users/verify/${userId}?id=${randomString}`;
              email = req.body.user_email;

              mailOptions = {
                to: email,
                subject: "Please verify your email to activate your account.",
                html: `Hello ${email},<br><br> Please Click the following link to verify your email address.<br><a href=${link}>Click here to verify</a>`
              };

              smtpTransport.sendMail(mailOptions, function (err, success) {
                if (err) {
                  return res.status(500).json({
                    message: "Sorry, not able to send email"
                  });
                }
                return res.status(200).json({
                  response: true,
                  message: "Verification email sent again.",
                  emailSent: true,
                  userId: response.insertId
                });
              });
            }
          });
        }
      });
    }
  });
};

module.exports = {
  registerUser,
  verify,
  resendVerficationEmail
};
