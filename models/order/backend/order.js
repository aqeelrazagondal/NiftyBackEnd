const db = require('../../../config/db.config');
const helpers = require('../../../helpers/helpers');

//Function to get maximum invoice number from the database
let maximumInvoiceNumber = function (callback) {
    return db.query(`SELECT MAX(invoice_no) AS maximumInvoiceNumber FROM tbl_orders`, callback);
}

//Function to add an order against a particular shop
let addOrder = function (order, invoiceNumber, userId, callback) {
    let orderDateTime = helpers.getCurrentDateTime();
    return db.query(`INSERT tbl_orders(fk_tbl_user_id, invoice_no,
        fk_tbl_user_shipment_address, invoice_amount, shipment_amount, 
        order_date, customer_ip, order_status) VALUES(?,?,?,?,?,?,?,?)`, [userId, invoiceNumber,
            order.fk_tbl_user_shipment_address, order.invoice_amount,
            order.shipment_amount, orderDateTime, order.customer_ip, order.status], callback);
}

//Check whether user exists or not in the system
let userExists = function (userId, callback) {
    return db.query(`SELECT * FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Chech whether the shipment address exists or not
let shipmentAddressExist = function (shipmentAddressId, callback) {
    return db.query(`SELECT * FROM tbl_users_shipment_addresses WHERE addresses_id = ?`, [shipmentAddressId], callback);
}

//Get ids of all orders of a shop
let getAllOrderIds = function (shopId, callback) {
    return db.query(`SELECT DISTINCT fk_order_id FROM tbl_oders_details WHERE 
    fk_reseller_shop_id = ?`, [shopId], callback);
}

//Get order details of a paritcular orderId
let getOrderDetails = function (orderId, callback) {
    return db.query(`SELECT order_id, order_date, invoice_amount, shipment_amount, 
    order_status FROM tbl_orders WHERE order_id = ?`, [orderId], callback);
}

//Function to get a single order Details:
let getSingleOrder = function (orderId, callback) {
    return db.query(`SELECT order_id, order_date, fk_tbl_user_id, order_status, 
    fk_tbl_user_shipment_address AS shippmentAddressId, customer_ip FROM tbl_orders WHERE order_id = ?`,
        [orderId], callback);
}

//Function to get user billing address
let getBillingAddress = function (userId, callback) {
    return db.query(`SELECT users_id,users_first_name, users_last_name,
    user_country, user_city, ser_state, user_zipcode, billing_address, user_email,
    user_phone FROM tbl_users WHERE users_id = ?`,
        [userId], callback);
}

//Function to get order details of a single order by provding it's id
let getSingleOrderDetails = function (orderId, callback) {
    return db.query(`SELECT fk_product_id, fk_reseller_shop_id, product_price,
    product_quantity,product_design, product_color, product_width, product_depth,
    product_height, product_delivery_status FROM tbl_oders_details WHERE fk_order_id = ?`,
        [orderId], callback);
}

//Function to get product details
let getProductDetails = function (productId, callback) {
    return db.query(`SELECT product_id, product_title, product_description 
    FROM tbl_products WHERE product_id = ?`,
        [productId], callback);
}

//Function to get product default image
let getProductImage = function (productId, callback) {
    return db.query(`SELECT fk_tbl_product_id AS product_id, image FROM tbl_product_images WHERE 
    fk_tbl_product_id = ? AND is_default = 1`, [productId], callback);
}

//Function to get shop name agaisnt shopId
let getShopName = function (shopId, callback) {
    return db.query(`SELECT reseller_shop_id AS shop_id, shop_name FROM tbl_reseller_shop WHERE 
    reseller_shop_id = ?`, [shopId], callback);
}


//Function to add Order details
let addOrderDetails = function (orderDetails, orderId, callback) {
    return db.query(`INSERT INTO tbl_oders_details(fk_order_id,
        fk_product_id, fk_reseller_shop_id, product_price, product_quantity,
        fk_tbl_product_shpiment_mode, product_shipment_charges, product_design,
        product_color, product_width, product_depth, product_height, product_delivery_status,
        product_delivery_date) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [orderId, orderDetails.fk_product_id,
            orderDetails.fk_reseller_shop_id, orderDetails.product_price, orderDetails.product_quantity,
            orderDetails.fk_tbl_product_shipment_mode, orderDetails.product_shipment_charges,
            orderDetails.product_design, orderDetails.product_color, orderDetails.product_width,
            orderDetails.product_depth, orderDetails.product_height, orderDetails.product_delivery_status,
            orderDetails.product_delivery_date], callback);
}

//Function to check whether the order exists or not
let orderExists = function (orderId, callback) {
    return db.query(`SELECT * FROM tbl_orders WHERE order_id = ?`, [orderId], callback);
}

//Function to check whether the product exists or not
let productExists = function (productId, callback) {
    return db.query(`SELECT * FROM tbl_products WHERE product_id = ?`, [productId], callback);
}

//Function to check whether the shop exists or not
let shopExists = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE reseller_shop_id = ?`, [shopId], callback);
}

//Function to add count number of times a product sold
let updateProductCount = function (productId, quantity, callback) {
    return db.query(`UPDATE tbl_products SET product_sold = product_sold + ? WHERE product_id = ?`,
        [quantity, productId], callback);
}

//Check whether the Shipment mode exists or not
let shipmentModeExists = function (shipmentModeId, callback) {
    return db.query(`SELECT * FROM reseller_shipment_mode WHERE id = ?`, [shipmentModeId], callback);
}

//function to update order delivery status
let updateOrderDeliveryStatus = function (orderDeliveryStatus, orderId, callback) {
    return db.query(`UPDATE tbl_orders SET order_status = ? 
    WHERE order_id = ?`, [orderDeliveryStatus, orderId], callback);
}

module.exports = {
    addOrder,
    maximumInvoiceNumber,
    userExists,
    shipmentAddressExist,
    getAllOrderIds,
    getOrderDetails,
    getSingleOrder,
    getBillingAddress,
    getSingleOrderDetails,
    getProductDetails,
    getProductImage,
    getShopName,
    addOrderDetails,
    orderExists,
    productExists,
    shopExists,
    shipmentModeExists,
    updateOrderDeliveryStatus,
    updateProductCount
}