const db = require('../../../../config/db.config');

//Function to get count of orders from database
let getOrderCount = function (shopId, callback) {
    return db.query(`SELECT COUNT(DISTINCT fk_order_id) AS orderCount FROM tbl_oders_details WHERE 
    fk_reseller_shop_id = ?`, [shopId], callback);
}

//Function to get earnings sales of a vendor
let getSales = function (shopId, callback) {
    return db.query(`SELECT SUM(product_price) AS sales FROM tbl_oders_details 
    WHERE fk_reseller_shop_id = ?`, [shopId], callback);
}

//Function to check whether the shop exists or not
let shopExists = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE reseller_shop_id = ?`, [shopId], callback);
}

//Function to get order with status
let getOrderDetails = function (shopId, callback) {
    return db.query(`SELECT DISTINCT fk_order_id, product_delivery_status FROM tbl_oders_details WHERE 
    fk_reseller_shop_id = ?`, [shopId], callback);
}

//Function to get shop views
let getViews = function (shopId, callback) {
    return db.query(`SELECT view_type, views FROM shop_views WHERE 
    fk_shop_id = ?`, [shopId], callback);
}

module.exports = {
    getOrderCount,
    getSales,
    shopExists,
    getOrderDetails,
    getViews
}