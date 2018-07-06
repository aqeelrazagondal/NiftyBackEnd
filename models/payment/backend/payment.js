const db = require('../../../config/db.config');

//Function to add product in cart
let connectVendor = function (vendorId, stripeAccount, callback) {
    return db.query(`UPDATE tbl_users SET stripe_user_id = ? WHERE users_id = ?
    AND users_type = ?`,
        [stripeAccount, vendorId, 'vendor'], callback);
}

let userExists = function (vendorIds, callback) {
    return db.query(`SELECT users_id, stripe_user_id FROM tbl_users WHERE users_id IN (?)`,
        [ vendorIds ], callback);
}
module.exports = {
    connectVendor,
    userExists
}