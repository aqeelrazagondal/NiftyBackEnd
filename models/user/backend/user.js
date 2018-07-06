const bcrypt = require("bcrypt");

const db = require("../../../config/db.config"); // Database pool instance
const helpers = require("../../../helpers/helpers");

//Function to get a particular user against a userId
let getUser = function (userId, callback) {
  return db.query(
    `SELECT users_username, users_first_name, users_last_name,
    users_gender, user_country, user_city, ser_state, user_zipcode,
    billing_address, user_email, user_phone, users_dob, users_about, users_type, 
    users_last_login_ip, users_joined_date, users_last_login_datetime, users_status,
    have_shop from tbl_users where users_id = ?`,
    [userId],
    callback
  );
};

//Function to update the user
let updateUser = function (user, userId, callback) {
  return db.query(
    `UPDATE tbl_users SET users_first_name = ?, users_last_name = ?, users_gender = ?,
            user_country = ?, user_city = ?, ser_state = ?, user_zipcode = ?, 
            billing_address = ?, user_email = ?, user_phone = ?, users_dob = ?, 
            users_about = ?, users_type = ? WHERE users_id = ?`,
    [
      user.users_first_name,
      user.users_last_name,
      user.users_gender,
      user.user_country,
      user.user_city,
      user.ser_state,
      user.user_zipcode,
      user.billing_address,
      user.user_email,
      user.user_phone,
      user.users_dob,
      user.users_about,
      user.users_type,
      userId
    ],
    callback
  );
};

//Function to change the status of the user from active to inactive or from inactive to active
let updateUserStatus = function (status, userId, callback) {
  //status variable
  let dbstatus;
  if (status === "active") {
    dbstatus = 1; //If the user status is to be enabled
  } else {
    dbstatus = 0; //If the user status is to be enabled
  }
  return db.query(
    `UPDATE tbl_users SET users_status = ? where users_id = ?`,
    [dbstatus, userId],
    callback
  );
};

//Function to update the user password
let updatePassword = function (password, userId, callback) {
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      return "Erorr at hashing password.";
    }
    return db.query(
      `UPDATE tbl_users SET users_password=? where users_id = ?`,
      [hashedPassword, userId],
      callback
    );
  });
};

//Function to update the user email
let updateEmail = function (newEmail, userId, callback) {
  console.log(newEmail)
  console.log(userId)
  console.log(callback)
  return db.query(
    `UPDATE tbl_users SET user_email = ? where users_id = ?`,
    [newEmail, userId],
    callback
  );
};

//Function to check the user against username and password
let findUser = function (userId, callback) {
  return db.query(`SELECT users_username, users_password, users_type, 
  users_status, have_shop, emailVerified FROM tbl_users WHERE users_id = ?`,
    [userId], callback);
}

//Function to check the user against username and password
let findUserAgainstEmail = function (userEmail, callback) {
  console.log(callback)
  console.log(userEmail);
  return db.query(`SELECT users_id, users_username, users_password, users_type, 
  users_status, have_shop, emailVerified FROM tbl_users WHERE user_email = ?`,
    [userEmail], callback);
}

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

// function to add user profile into the databse
let addUserProfile = function (user, userId, callback) {
  return db.query(
    `UPDATE tbl_users SET users_gender = ?, user_country = ?, user_city = ?, 
    ser_state = ?, user_zipcode = ?, user_phone = ?, users_dob = ?, 
    users_about = ? WHERE users_id = ?`, [user.users_gender, user.user_country,
    user.user_city, user.ser_state, user.user_zipcode, user.user_phone,
    user.users_dob, user.users_about, userId], callback);
};

module.exports = {
  getUser,
  updateUser,
  updateUserStatus,
  updatePassword,
  updateEmail,
  findUser,
  findUserAgainstEmail,
  addToken,
  getToken,
  removeToken,
  addUserProfile,
};
