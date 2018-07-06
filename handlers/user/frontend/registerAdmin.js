//////////////////////////Enabled just for once///////////////
const validator = require('validator');

const model = require("../../../models/user/frontend/register");
const helpers = require("../../../helpers/helpers");
const acl = require(".././../../acl/aclInMongoDB");

//Handler to handle the route for adding an admin
let addAdmin = function (req, res) {
    //////////////////////////Validations//////////////////////////////////////////

    ///////////Type Validations///////////
    //Check the types of the users_username
    if (typeof req.body.users_username !== "string") {
        return res.status(422).json({
            response: false,
            message: "users_username is required as string."
        });
    }

    if (req.body.user_email === undefined) {
        return res.status(422).json({
            response: false,
            message: "user_email is required as string."
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
            message: "Email not valid"
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

    /////////////////After successful validatons, Add user////////////////////
    model.adminExists(function (err, adminExistsResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: `not able to proccess query at adminExists`
            });
        }
        if (adminExistsResponse.length) {
            return res.status(500).json({
                response: false,
                message: `Admin already created`
            });
        } else {
            model.addAdmin(req.body, function (err, response) {
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
                        message: `not able to proccess query at addAdmin` + err
                    });
                }

                if (response.insertId) {
                    userId = response.insertId;
                    //Assign roles to the user
                    acl.assignRole(userId, "admin");
                    return res.status(200).json({
                        response: true,
                        message: `Admin added successfully`
                    });
                }
            });
        }
    });
}

module.exports = {
    addAdmin
}