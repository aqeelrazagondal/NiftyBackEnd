const db = require('../../../config/db.config');
const helpers = require('../../../helpers/helpers');

//function to add Commission Record in database
let addCommissionRecord = function (commissionRecord, vendorId, callback) {
    let currentDate = helpers.getCurrentDate();
    db.query(`INSERT INTO tbl_commission_records(date, invoice_number, 
        fk_vendor_id, fk_tbl_order_order_number, amount, commission_deducted) 
        VALUES(?,?,?,?,?,?)`, [currentDate, commissionRecord.invoice_number,
            vendorId, commissionRecord.fk_tbl_order_order_number, commissionRecord.amount, 
            commissionRecord.commission_deducted], callback);
}

//function to update Commission Record in database
let getCommissionRecord = function (vendorId, callback) {
    db.query(`SELECT * FROM tbl_commission_records WHERE fk_vendor_id = ?`, [vendorId], callback);
}

//Function to check whether the order exists or not
let orderExists = function (orderId, callback) {
    return db.query(`SELECT * FROM tbl_orders WHERE order_id = ?`, [orderId], callback);
}

//Function to check whether the invoice number is attached with the order whose id is provided
let isValidInvoice = function (orderId, invoiceNumber, callback) {
    return db.query(`SELECT * FROM tbl_orders WHERE order_id = ? AND invoice_no = ?`, [orderId, invoiceNumber], callback);
}

//Function to check whether the vendor exits or not
let vendorExists = function(vendorId, callback) {
    return db.query(`SELECT * FROM tbl_users WHERE users_type = ? AND users_id = ?`, ['vendor', vendorId], callback);
}

module.exports = {
    addCommissionRecord,
    getCommissionRecord,
    orderExists,
    isValidInvoice,
    vendorExists
}