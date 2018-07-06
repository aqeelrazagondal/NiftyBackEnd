const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const validator = require("validator");
const moment = require('moment');

const helpers = require("../../../helpers/helpers");
const model = require("../../../models/user/frontend/login");
const config = require("../../../config/config");

const emailLinkExpiry = 1000 * 60 * 10; //Set the duration after which the verification link will be expired

let loginUser = function (req, res) {
  let payload;
  let token;
console.log('req');
console.log(req.body);

  if (typeof req.body.username !== 'string') {
    return res.status(422).json({
      response: false,
      message: "username is required as a string."
    });
  }

  if (typeof req.body.password !== 'string') {
    return res.status(422).json({
      response: false,
      message: "password is required as a string."
    });
  }

  //Get the user from databae against the username provided
  model.findUser(req.body.username, function (err, response) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "not able to proccess query at findUser"
      });
    }
    if (response.length === 0) {
      return res.status(404).json({
        response: false,
        message: "User not found with usernames: " + req.body.username
      });
    }


    //Check whether the password matches or not.
    bcrypt.compare(req.body.password, response[0].users_password, function (
      err,
      bcryptResponse
    ) {
      if (err) {
        return res.status(500).json({
          response: false,
          message: "not able to compare passwords with bcrypt"
        });
      }
      //If the password is valid
      if (bcryptResponse) {
        model.updateUserLogin(
          response[0].users_id,
          req.body.userIp,
          function (err, updateUserResponse) {
            if (err) {
              return console.log("User login updated successfully");
            }
            return console.log("User login updated successfully");
          }
        );
        payload = {
          userId: response[0].users_id
        };
        token = jwt.sign(payload, config.secret, {
          // expiresIn : 60 // expires in seconds
        });

        return res.status(200).json({
          response: true,
          userId: response[0].users_id,
          userType: response[0].users_type,
          userStatus: response[0].users_status,
          userHaveShop: response[0].have_shop,
          emailVerified: response[0].emailVerified,
          message: "Token generated successfully",
          token: token
        });
      } else {
        return res.status(422).json({
          response: false,
          message: "Invalid password"
        });
      }
    });
  });
};

//Handler for the route forgot password:
let forgotPassword = function (req, res) {
  let randomString, host, email, link, mailOptions, userId;

  /////////////Email validation//////////////////
  if (typeof req.body.useremail !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Please provide valid email address."
    });
  }
  
  if (!validator.isEmail(req.body.useremail)) {
    return res.status(422).json({
      response: false,
      message: "Please provide valid email address."
    });
  }

  model.userExists(req.body.useremail, function (err, userExistsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to proccess query at userExist in forgotPassword"
      });
    }
    if (!userExistsResponse.length) {
      return res.status(404).json({
        response: false,
        message: "User not found"
      });
    } else {
      model.getToken(userExistsResponse[0].users_id, "forgotPassword", function (
        err,
        getTokenResponse
      ) {
        if (err) {
          return console.log(
            "not able to add token at getToken at forgotPassword"
          );
        }
        if (getTokenResponse.length) {
          return res.status(500).json({
            response: true,
            message: "Email already sent, please wait for 10 mints for resend"
          });
        }
        randomString = crypto.randomBytes(20).toString("hex");
        userId = userExistsResponse[0].users_id;
        model.addToken(randomString, userId, "forgotPassword", function (
          err,
          addTokenResponse
        ) {
          if (err) {
            return console.log("not able to add token at forgot password");
          }

          setTimeout(function () {
            model.removeToken(userId, "forgotPassword", function (
              err,
              removeTokenResponse
            ) {
              if (err) {
                console.log(err);
              } else {
                console.log("token removed");
              }
            });
          }, emailLinkExpiry);

          host = req.get("host");

          // link = `http://${req.get('host')}/html/resetPassword?userId=${userId}?token=${randomString}`;
          link = `http://${req.get(
            "host"
          )}/html/resetPassword.html?userId=${userId}&token=${randomString}`;
          email = req.body.useremail;
          mailOptions = {
            to: email,
            subject: "Reset Password request",
            html: `Hello ${email},<br><br> Please Click the following link to update your password.<br><a href=${link}>Click here to verify</a>`
          };

          smtpTransport.sendMail(mailOptions, function (err, success) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: "Sorry, not able to send email"
              });
            }
            return res.status(200).json({
              response: true,
              message: "email sent for password reset",
              emailSent: true,
              userId: userId
            });
          });
        });
      });
    }
  });
};
//Handler for reset password
let resetPassword = function (req, res) {

  if (req.body.updatedPassword === undefined) {
    return res.status(403).json({
      response: false,
      message: "Please provide the updated password"
    });
  }

  if (req.body.token === undefined) {
    return res.status(403).json({
      response: false,
      message: "Please provide the token."
    });
  }

  if (!helpers.isValidPassword(req.body.updatedPassword)) {
    return res.status(403).json({
      response: false,
      message:
        "Please provide the valid updated password, it should be 8 character long, atleast one special character, one Uppercase ,one lowercase and one number"
    });
  }

  model.userExistsUserId(req.params.userId, function (err, userExistsResponse) {
    if (err) {
      return console.log(
        "Error at proccessing query at userExistsid resetPassword"
      );
    }
    if (!userExistsResponse.length) {
      return res.status(404).json({
        response: false,
        message: "User not found"
      });
    } else {
      let token =
        req.body.token || req.query.token || req.headers["x-access-token"];
      if (!token) {
        // if there is no token, return an error
        return res.status(403).json({
          response: false,
          message: "Please provide the token for update password."
        });
      }
      model.getToken(req.params.userId, 'forgotPassword', function (err, getTokenResponse) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "Not able to proccess query at getToken"
          });
        }
        if (getTokenResponse.length) {
          if (getTokenResponse[0].token === token) {
            model.resetUserPassword(
              req.params.userId,
              req.body.updatedPassword,
              function (err, resetUserPasswordResponse) {
                if (err) {
                  return res.status(500).json({
                    response: false,
                    message: "Not able to update password"
                  });
                }
                if (removeTokenResponse.affectedRows) {
                  return console.log('Token removed successfully');
                } else {
                  return console.log('Failed to remove token');
                }
                model.removeToken(req.params.userId, "forgotPassword", function (err, removeTokenResponse) {
                  if (err) {
                    return res.status(500).json({
                      response: false,
                      message: "Not able to proccess query at removeToken"
                    });
                  }
                });
                return res.status(200).json({
                  response: true,
                  message: "Password updated successfully."
                });
              }
            );
          } else {
            return res.status(422).json({
              response: false,
              message: "invalid token"
            });
          }
        } else {
          return res.status(500).json({
            response: false,
            message: "no token found against userId: " + req.params.userId
          });
        }
      });
    }
  });
};


module.exports = {
  loginUser,
  forgotPassword,
  resetPassword
};
