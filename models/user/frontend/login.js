const bcrypt = require('bcrypt');

const helpers = require('../../../helpers/helpers');
const db = require('../../../config/db.config'); // Database pool instance

//Function to check the user against username and password
let findUser = function (username, callback) {
    return db.query(`SELECT users_id, users_password, users_type, users_status, have_shop, emailVerified FROM tbl_users WHERE users_username = ? `, [username], callback);
}
//Function to update the user after user is logged in
let updateUserLogin = function (userId, userLastLoginIP, callback) {
    let currentDateTime = helpers.getCurrentDateTime();
    let date = helpers.getCurrentDate();
    console.log(currentDateTime);
    return db.query(`UPDATE tbl_users SET users_last_login_ip = ?, users_last_login_datetime = ? WHERE users_Id = ?`, [userLastLoginIP, helpers.getCurrentDateTime(), userId], callback);
}

//Function to check whether the email has been verified or not
let checkEmailVerification = function (userId, callback) {
    return db.query(`SELECT emailVerified FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Function to add token against a user
let addToken = function (token, userId, token_for, callback) {
    return db.query(`INSERT INTO tbl_verification_token(fk_users_id, token, token_for ) VALUES (?, ?, ?) `, [userId, token, token_for], callback);
}

//Function to get the token
let getToken = function (userId, token_for, callback) {
    console.log(userId, token_for);
    return db.query(`SELECT TOKEN FROM tbl_verification_token WHERE fk_users_id = ? && token_for = ? `, [userId, token_for], callback);
}

//Function to remove random string against a user
let removeToken = function (userId, token_for, callback) {
    console.log('userId' + userId);
    return db.query(`DELETE FROM tbl_verification_token WHERE fk_users_id = ? && token_for = ? `, [userId, token_for], callback);
}

//Check whether user exists or not in the system
let userExists = function (email, callback) {
    return db.query(`SELECT users_id FROM tbl_users WHERE user_email = ?`, [email], callback);
}

//Check whether user exists or not in the system
let userExistsUserId = function (userId, callback) {
    return db.query(`SELECT user_email FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Reset user password
let resetUserPassword = function(userId, updatedPassword, callback) {
    bcrypt.hash(updatedPassword, 10, function(err, hashedPassword) {
        if(err) {
            return console.log('Error at hashing');            
        } 
            return db.query(`UPDATE tbl_users SET users_password = ? WHERE users_id = ?`, [hashedPassword, userId], callback);    
    });
}

//Function to get a particular user against a userId
let getUser = function(userId, callback) {
    return db.query(
      `SELECT users_id,users_username, users_first_name, users_last_name,
      users_gender, user_country, user_city, ser_state, user_zipcode,
      billing_address, user_email, user_phone, users_dob, users_about, users_type, 
      users_last_login_ip, users_joined_date, users_last_login_datetime, users_status,
      have_shop from tbl_users where users_id = ?`,
      [userId],
      callback
    );
  };
module.exports = {
    findUser,
    updateUserLogin,
    checkEmailVerification,
    addToken,
    getToken,
    removeToken,
    userExists,
    resetUserPassword,
    userExistsUserId,
    getUser
}