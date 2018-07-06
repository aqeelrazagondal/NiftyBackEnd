const db = require('../../../config/db.config');

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

//function to update order delivery status in order details
let updateOrderDeliveryStatus = function (orderDeliveryStatus, orderId, callback) {
    return db.query(`UPDATE tbl_oders_details SET product_delivery_status = ? WHERE fk_order_id = ?`, [orderDeliveryStatus, orderId], callback);
}

module.exports = {
    addOrderDetails,
    orderExists,
    productExists,
    shopExists,
    shipmentModeExists,
    updateOrderDeliveryStatus,
    updateProductCount
}