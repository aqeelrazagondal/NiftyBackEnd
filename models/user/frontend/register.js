const bcrypt = require("bcrypt");

const helpers = require("../../../helpers/helpers");
const db = require("../../../config/db.config"); // Database pool instance

// function to register a new user into the databse
let registerUser = function (user, callback) {
  let currentDate = helpers.getCurrentDate();
  //Encrypting password and then returning the query
  bcrypt.hash(user.users_password, 10, function (err, hashedPassword) {
    let emailVerfied = 0;
    if (err) {
      return console.log("Error at hashing");
    }
    return db.query(
      `INSERT INTO tbl_users(users_username, users_password, user_email, 
        users_joined_date, users_type, users_status, emailVerified) 
            VALUES (?,?,?,?,?,?,?)`,
      [
        user.users_username,
        hashedPassword,
        user.user_email,
        currentDate,
        user.users_type,
        1,
        0
      ],
      callback
    );
  });
};

//Update emailVerified to true
let verifyEmail = function (userId, callback) {
  return db.query(
    `UPDATE tbl_users SET emailVerified = ? WHERE users_Id = ?`,
    [1, userId],
    callback
  );
};

//Check whether user has verified email or not
let checkEmailVerification = function (email, callback) {
  return db.query(
    `SELECT users_id, emailVerified FROM tbl_users WHERE user_email = ?`,
    [email],
    callback
  );
};

//Function to add token against a user
let addToken = function (token, userId, token_for, callback) {
  return db.query(
    `INSERT INTO tbl_verification_token(fk_users_id, token, token_for ) VALUES (?, ?, ?) `,
    [userId, token, token_for],
    callback
  );
};

//Function to get the token
let getToken = function (userId, token_for, callback) {
  return db.query(
    `SELECT TOKEN FROM tbl_verification_token WHERE fk_users_id = ? && token_for = ? `,
    [userId, token_for],
    callback
  );
};

//Function to remove random string against a user
let removeToken = function (userId, token_for, callback) {
  console.log("userId" + userId);
  return db.query(
    `DELETE FROM tbl_verification_token WHERE fk_users_id = ? && token_for = ? `,
    [userId, token_for],
    callback
  );
};

//Check whether user exists or not in the system
let userExists = function (email, callback) {
  return db.query(
    `SELECT users_id FROM tbl_users WHERE user_email = ?`,
    [email],
    callback
  );
};

//Check whether admin already exists or not in the system
let adminExists = function (callback) {
  return db.query(
    `SELECT users_id FROM tbl_users WHERE users_type = ?`,
    ['admin'],
    callback
  );
};

// function to add a new user into the databse
let addAdmin = function (user, callback) {
  let currentDate = helpers.getCurrentDate();
  //Encrypting password and then returning the query
  bcrypt.hash(user.users_password, 10, function (err, hashedPassword) {
    let emailVerfied = 0;
    if (err) {
      return console.log("Error at hashing");
    }
    return db.query(
      `INSERT INTO tbl_users(users_username, users_password, user_email,
        users_type, users_joined_date, users_status, emailVerified) 
            VALUES (?,?,?,?,?,?,?)`,
      [
        user.users_username,
        hashedPassword,
        user.user_email,
        "admin",
        currentDate,
        1,
        1
      ],
      callback
    );
  });
};

module.exports = {
  registerUser,
  verifyEmail,
  checkEmailVerification,
  addToken,
  getToken,
  removeToken,
  userExists,
  addAdmin,
  adminExists
};
