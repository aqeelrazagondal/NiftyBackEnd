const db = require('../../../config/db.config');

//Function to get orderId and amount to get all invoices
let getOrderDetails = function (shopId, limit, callback) {
    if (limit) {
        limit = Number.parseInt(limit);
        return db.query(`SELECT DISTINCT(fk_order_id), product_delivery_date
        FROM tbl_oders_details WHERE fk_reseller_shop_id = ? limit ?`,
            [shopId, limit], callback);
    } else {
        return db.query(`SELECT DISTINCT(fk_order_id), product_delivery_date
        FROM tbl_oders_details WHERE fk_reseller_shop_id = ?`,
            [shopId], callback);
    }

}

//Function to get invoice number and customer id
let getOrder = function (orderId, callback) {
    return db.query(`SELECT order_id, order_status, invoice_no, fk_tbl_user_id, invoice_amount, order_date FROM tbl_orders 
    WHERE order_id = ?`,
        [orderId], callback);
}
//Function to get user name against userIds
let getUserName = function (userId, callback) {
    return db.query(`SELECT users_id, users_first_name, users_last_name FROM tbl_users WHERE users_id = ?`,
        [userId], callback);
}

//Function to check if any order exists for a shopid
let orderExists = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_oders_details WHERE fk_reseller_shop_id = ?`,
        [shopId], callback);
}

//Function to get a single invoice details
let getOrderInvoice = function (invoiceNumber, callback) {
    return db.query(`SELECT order_id, fk_tbl_user_id, invoice_no, order_status, 
    fk_tbl_user_shipment_address, order_date FROM tbl_orders WHERE invoice_no = ?`,
        [invoiceNumber], callback);
}

//Function to get order details against order id
let getOrderDetailsInvoice = function (orderId, callback) {
    return db.query(`SELECT fk_order_id, fk_product_id, product_price, 
    product_quantity,product_delivery_status FROM tbl_oders_details WHERE fk_order_id = ?`,
        [orderId], callback);
}

//Function to get item or product descript against productId
let getProductDetails = function (productId, callback) {
    return db.query(`SELECT product_id, product_description, product_title FROM tbl_products WHERE 
    product_id = ?`,
        [productId], callback);
}

//Function to get shipment address against shipmentId
let getShipmentAddress = function (shipmentAddressId, callback) {
    return db.query(`SELECT * FROM tbl_users_shipment_addresses WHERE 
    addresses_id = ?`,
        [shipmentAddressId], callback);
}

//Function to get billing address of a user
let getBillingDetails = function (userId, callback) {
    return db.query(`SELECT user_country, user_city, ser_state, user_zipcode, 
    billing_address FROM tbl_users WHERE users_id = ?`,
        [userId], callback);
}


module.exports = {
    getOrderDetails,
    getOrder,
    getUserName,
    orderExists,
    getOrderInvoice,
    getOrderDetailsInvoice,
    getProductDetails,
    getShipmentAddress,
    getBillingDetails
}