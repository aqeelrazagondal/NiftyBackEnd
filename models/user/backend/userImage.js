const db = require('../../../config/db.config'); // Database pool instance

let findImage = function (userId, callback) {
    return db.query(`SELECT imagename FROM tbl_users WHERE users_id = ?`, [userId], callback)
}
//Function to save the name/address of the userimage
let saveUserImage = function (userImageName, userId, callback) {
    return db.query(`UPDATE tbl_users SET imagename = ? where users_id = ?`, [userImageName, userId], callback);
}
//Check whether user exists or not in the system
let userExists = function (userId, callback) {
    return db.query(`SELECT user_email FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

module.exports = {
    findImage,
    saveUserImage,
    userExists
}