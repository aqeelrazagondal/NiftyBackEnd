const db = require('../../../config/db.config');
const helpers = require('./../../../helpers/helpers');

//Function to check if user exists 
let checkUser = function (userId, callback) {
    return db.query(`SELECT * FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Function to find the user against facebook id
let userwithSocialMediaId = function (facebookId, callback) {
    return db.query(`select * from user_external_login WHERE id = ?`, [
        facebookId
    ], callback);
}

//Add user in the database
let addUser = function (firstName, lastName, email, callback) {
    let currentDate = helpers.getCurrentDate();
    return db.query(`INSERT INTO tbl_users( users_first_name, users_last_name,users_joined_date, 
        user_email) VALUES(?,?,?,?)`, [firstName, lastName, currentDate, email], callback);
}

//Add user social media info into the database
let addUserSocialMedia = function (id, userId, token, provider, callback) {
    return db.query(`INSERT INTO user_external_login(id, fk_users_id, token,
        authentication_provider) VALUES(?,?,?,?)`, [id, userId, token, provider], callback);
}

module.exports = {
    checkUser,
    userwithSocialMediaId,
    addUserSocialMedia,
    addUser
}