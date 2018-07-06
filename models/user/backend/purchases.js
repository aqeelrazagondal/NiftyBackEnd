const db = require("../../../config/db.config"); // Database pool instance
const helpers = require("../../../helpers/helpers");

//Function to get all of the purchases of a user (customer)
let getAllPurchases = function (userId, stringLimit, callback) {
    let limit = Number.parseInt(stringLimit);

    if (limit) {
        return db.query(`SELECT order_id, order_status, invoice_amount 
    FROM tbl_orders WHERE fk_tbl_user_id = ? limit ?`, [userId, limit],
            callback);
    } else {
        return db.query(`SELECT order_id, order_status, invoice_amount 
    FROM tbl_orders WHERE fk_tbl_user_id = ?`, [userId], callback);
    }
}
//Function to get a single purchases details
let getOrders = function (userId, callback) {
    return db.query(`SELECT order_id,fk_tbl_user_shipment_address AS 
    shippingAddressId, customer_ip, fk_tbl_user_id AS userId, order_status 
    FROM tbl_orders WHERE order_id= ?`, [userId], callback);
}

//Function to get all details of an order
let getOrderDetails = function (orderId, callback) {
    console.log(orderId);
    return db.query(`SELECT fk_product_id,
    fk_reseller_shop_id AS shopId, product_price, product_quantity,
    product_shipment_charges as shipmentCharges, product_design,
    product_color, product_width, product_depth, product_height,
    product_delivery_status AS productDeliveryStatus, product_delivery_date 
    FROM tbl_oders_details WHERE fk_order_id = ?`,
        [orderId], callback);
}

//Function to get shopDetails against shopIds array
let getShop = function (shopIds, callback) {
    return db.query(`SELECT reseller_shop_id AS shopId, 
    fk_tbl_users_users_id AS vendorId, short_description as description, 
    shop_name FROM tbl_reseller_shop WHERE reseller_shop_id IN (?)`,
        [shopIds], callback);
}

//Function to get Product details:
let getProduct = function (productIds, callback) {
    return db.query(`SELECT product_title AS name, product_description AS decription  FROM tbl_products WHERE product_id in (?)`, [productIds], callback);
}

//Function to get user details 
let getUser = function (userId, callback) {
    return db.query(`SELECT users_first_name AS firstName, users_last_name AS lastName, 
    emailVerified, ser_state, user_city, user_email, user_phone, user_zipcode, billing_address, 
    user_country FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Function to get shipping address
let getShippingAddress = function (shippingAddressId, callback) {
    return db.query(`SELECT * FROM tbl_users_shipment_addresses WHERE addresses_id = ?`,
        [shippingAddressId], callback);
}

module.exports = {
    getAllPurchases,
    getOrders,
    getOrderDetails,
    getShop,
    getProduct,
    getUser,
    getShippingAddress
}