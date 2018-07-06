const db = require('../../../config/db.config');

//Function to add commission details for admin in the database
let addCommission = function (commissionRate, callback) {
    db.query(`INSERT INTO tbl_admin_comission(flat_comission_rate) VALUES(?)`, [commissionRate], callback);
}

//Function to update commission details for admin in the database
let updateCommission = function (commissionRate, commissionId, callback) {
    db.query(`UPDATE tbl_admin_comission SET flat_comission_rate = ? WHERE comission_id = ?`, [commissionRate, commissionId], callback);
}

//Function to check whether commission record exists or not
let commissionRecordExists = function (commissionId, callback) {
    db.query(`SELECT * FROM tbl_admin_comission WHERE comission_id = ?`, [commissionId], callback);
}

module.exports = {
    addCommission,
    updateCommission,
    commissionRecordExists
}