const validator = require("validator");
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const countries = require('country-list')();
const cities = require('cities-list');

const helpers = require("../../../helpers/helpers");

const model = require("../../../models/user/backend/user");

const emailLinkExpiry = 1000 * 60 * 10; //Set the duration after which the verification link will be expired

//Handler to handle the Get user Route, will return the user instance by providing the userId
let getUser = function (req, res) {
  model.getUser(req.params.userId, function (err, response) {
    /*If there is an error from the model, handle it here by providing the error object as the response*/
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to process query at getUser"
      });
    }
    /*Check whether user exists or not, if no user found, 
          if there is no user with the userId provided, the the length of
          response (Response is an array) would be 0
          */
    if (response.length === 0) {
      return res.status(404).json({
        response: false,
        message: "User not found with the userId: " + req.params.userId
      });
    }
    //Success response with the user object as response
    return res.status(404).json({
      response: true,
      message: "User found with id: " + req.params.userId,
      user: response
    });
  });
};

//Hanlder to handle the Update User route, this will update the user instance against a userId
let updateUser = function (req, res) {

  ///////////Type Validations///////////
  //Check the types of the users_first_name or not whether it's defined or not
  if (typeof req.body.users_first_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_first_name is required as a string."
    });
  }

  //Check the types of the users_last_name or not whether it's defined or not
  if (typeof req.body.users_last_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_last_name is required as a string."
    });
  }

  //Check the types of the users_gender or not whether it's defined or not
  if (
    typeof req.body.users_gender !== "string" ||
    req.body.users_gender !== "male" &&
    req.body.users_gender !== "female" &&
    req.body.users_gender !== "other"
  ) {
    return res.status(422).json({
      response: false,
      message: "users_gender is required as 'male', 'female' or 'other'."
    });
  }

  //Check the types of the user_country or not whether it's defined or not
  if (typeof req.body.user_country !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_country is required as a string."
    });
  }

  //Check the types of the user_city or not whether it's defined or not
  if (typeof req.body.user_city !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_city is required as a string. Please provide valid city."
    });
  }

  //Check the types of the ser_state or not whether it's defined or not
  if (typeof req.body.ser_state !== "string") {
    return res.status(422).json({
      response: false,
      message: "ser_state is required as a string."
    });
  }

  //Check the types of the user_zipcode or not whether it's defined or not
  if (typeof req.body.user_zipcode !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_zipcode is required as a string."
    });
  }

  //Check the types of the billing_address or not whether it's defined or not
  if (typeof req.body.billing_address !== "string") {
    return res.status(422).json({
      response: false,
      message: "billing_address is required as a string."
    });
  }

  //Check whether the date of birth is valid or not
  if (!helpers.isValidDate(req.body.users_dob)) {
    return res.status(422).json({
      response: false,
      message:
        "Date of birth is not valid, it must be in the format of 'yyyy/mm/dd' e.g: 2018/03/16"
    });
  }

  //Check the types of the users_about or not whether it's defined or not
  if (typeof req.body.users_about !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_about is required as a string."
    });
  }
  //Check the types of the users_type or not whether it's defined or not
  if (typeof req.body.users_type !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_type is required as a string."
    });
  }

  //Check the types of the users_type or not whether it's defined or not
  if (req.body.users_type !== "vendor" && req.body.users_type !== "customer") {
    return res.status(422).json({
      response: false,
      message: "users_type must be customer or vendor."
    });
  }

  /////////////Email validation//////////////////
  if (!validator.isEmail(req.body.user_email)) {
    return res.status(422).json({
      response: false,
      message: "Email is required as a valid email address."
    });
  }

  /////////////Phone Number Validations/////////////////
  if (!validator.isMobilePhone(req.body.user_phone, "any")) {
    return res.status(422).json({
      response: false,
      message: `Phone number is requied as a valid phone number.`
    });
  }

  //After validatons, Update user instance
  model.updateUser(req.body, req.params.userId, function (err, response) {
    // Check whether query run successful or not
    if (err) {
      return res.status(500).json({
        response: false,
        message: `not able to process query at updateUser` + err
      });
    }
    if (response.affectedRows) {
      return res.status(200).json({
        response: true,
        message: `User updated successfully`
      });
    } else {
      return res.status(422).json({
        response: true,
        message: `user not found with Id: ` + req.params.userId
      });
    }
  });
};

//Handle to handle the route to update user email address
let updateEmail = function (req, res) {
  let randomString, host, email, link, mailOptions, userId;
  /////////Validations/////////////
  ////////Validate email address////////

  if (req.body.newEmail === undefined) {
    return res.status(422).json({
      response: false,
      message: `Please provide new email address.`
    });
  }

  if (req.body.userEmail === undefined) {
    return res.status(422).json({
      response: false,
      message: `Please provide your email address.`
    });
  }

  if (!validator.isEmail(req.body.newEmail)) {
    return res.status(422).json({
      response: false,
      message: `Your new email address is not valid, please provide a valid email address`
    });
  }

  model.findUserAgainstEmail(req.body.userEmail, function (err, userExistsResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: `not able to proccess query at findUserAgainstEmail`
      });
    }
    if (userExistsResponse.length) {
      //Set userId here
      userId = userExistsResponse[0].users_id;
      model.updateEmail(req.body.newEmail, userExistsResponse[0].users_id, function (err, updateEmailResponse) {
        if (err) {
          return res.status(422).json({
            response: false,
            message: `not able to proccess query at updateEmail`
          });
        }
        if (updateEmailResponse.affectedRows) {
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
          email = req.body.newEmail;

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
              message: `Email updated successfully, email verifications sent, please verify your email address`,
              emailSent: true,
            });
          });
        } else {
          return res.status(422).json({
            response: false,
            message: `not able to update email address`
          });
        }
      });
    } else {
      return res.status(422).json({
        response: false,
        message: `user not found with email address: ` + req.body.userEmail
      });
    }
  });
}

//Handler to handle the the api endpoint for making a user active or inactive
let updateUserStatus = function (req, res) {
  //Check whether the status provided by the user is valid or not
  if (req.body.status === "active" || req.body.status === "inactive") {
    model.updateUserStatus(req.body.status, req.params.userId, function (
      err,
      response
    ) {
      if (err) {
        return res.status(422).json({
          response: false,
          message: `not able to process query at udpateUserStatus`
        });
      }
      if (response.affectedRows) {
        return res.status(200).json({
          response: true,
          message: `Status updated successfully`
        });
      } else {
        return res.status(500).json({
          response: false,
          message: `Not able to update user status`
        });
      }
    });
  } else {
    return res.status(422).json({
      response: false,
      message: `Statusnot valid, should be 'active' or 'inactive'`
    });
  }
};

//Function to update user password
let updatePassword = function (req, res) {
  ///////If password is invalid/////////
  if (typeof req.body.newPassword !== 'string') {
    return res.status(403).json({
      response: false,
      message:
        "Please provide the valid updated password, it should be 8 character long, atleast one special character, one Uppercase ,one lowercase and one number"
    });
  }

  if (typeof req.body.old !== 'string') {
    return res.status(403).json({
      response: false,
      message:
        "Please provide the valid old password."
    });
  }

  if (!helpers.isValidPassword(req.body.newPassword)) {
    return res.status(403).json({
      response: false,
      message:
        "Please provide the valid updated password, it should be 8 character long, atleast one special character, one Uppercase ,one lowercase and one number"
    });
  }

  ////////After successful validations///////////
  model.findUser(req.params.userId, function (err, findUserResponse) {
    if (findUserResponse.length) {

      bcrypt.compare(req.body.oldPassword, findUserResponse[0].users_password, function (err, passwordResponse) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "not able to proccess password comparision with bcrypt"
          });
        }
        if (passwordResponse) {
          model.updatePassword(req.body.newPassword, req.params.userId, function (err, response) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: "An error occured during updating password."
              });
            }
            return res.status(200).json({
              response: true,
              message: "Password updated succcessfully."
            });
          });
        } else {
          return res.status(500).json({
            response: false,
            message: "Password is wrong, please enter valid password"
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "user not found with userId: " + req.params.userId
      });
    }
  });
};

//Handler to handle the route of adding user profile
let addUserProfile = function (req, res) {
  //////////////////////////Validations//////////////////////////////////////////
  ///////////Type Validations///////////

  //Check the types of the users_gender or not whether it's defined or not
  if (
    typeof req.body.users_gender !== "string" ||
    req.body.users_gender !== "male" &&
    req.body.users_gender !== "female" &&
    req.body.users_gender !== "other"
  ) {
    return res.status(422).json({
      response: false,
      message: "users_gender is required as 'male', 'female' or 'other'."
    });
  }


  //Check the types of the users_about
  if (typeof req.body.users_about !== "string") {
    return res.status(422).json({
      response: false,
      message: "users_about is required as a string."
    });
  }

  //////Country Validation////////
  if (typeof req.body.user_country !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Country is required as a string!"
    });
  }

  //////Country Validation////////
  if (countries.getCode(req.body.user_country) === undefined) {
    return res.status(422).json({
      response: false,
      message: "Country is required as a string!"
    });
  }

  //////city Validation////////
  if (typeof req.body.user_city !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Country is required as a string!"
    });
  }

  if (req.body.user_city === undefined) {
    return res.status(422).json({
      response: false,
      message: "City is required as a string. not provided in body."
    });
  }

  //Check if city provided is valid or not 
  if (cities[helpers.capitalize(req.body.user_city)] === undefined) {
    return res.status(422).json({
      response: false,
      message: "City is required as a string!"
    });
  }

  //Check whether the date is valid or not
  if (!helpers.isValidDate(req.body.users_dob)) {
    return res.status(422).json({
      response: false,
      message:
        "Date is not valid, it must be in the format of 'yy/mm/dd' e.g: 2018/03/16"
    });
  }

  //////////////After Validating everything//////////////
  model.addUserProfile(req.body, req.params.userId, function (err, addUserProfileResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message:
          "not able to proccess query at addUserProfile " + err
      });
    }
    if (addUserProfileResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "user profile added successfully"
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "not able to add user profile"
      });
    }
  });
}

module.exports = {
  getUser,
  updateUser,
  updateEmail,
  updateUserStatus,
  updatePassword,
  addUserProfile
};
