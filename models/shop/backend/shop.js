const db = require('../../../config/db.config');
const helpers = require('../../../helpers/helpers');

//function to add shop oreferences
let shopPreferences = function (shopPreferences, userId, callback) {
    let status = 1;
    let created_date = helpers.getCurrentDate();
    return db.query(`INSERT INTO tbl_reseller_shop(fk_tbl_users_users_id, shop_address, 
        shop_zipcode, lattitude, longitude, status, created_date ) 
        VALUES(?,?,?,?,?,?,?)`, [userId, shopPreferences.shop_address,
            shopPreferences.shop_zipcode, shopPreferences.lattitude,
            shopPreferences.longitude, status, created_date], callback);
}

//function to update shop oreferences
let updateShopPreferences = function (shopPreferences, shopId, callback) {
    return db.query(`UPDATE tbl_reseller_shop SET shop_address = ?, shop_zipcode = ?,
    lattitude = ?, longitude = ? WHERE reseller_shop_id = ?`,
        [shopPreferences.shop_address, shopPreferences.shop_zipcode,
        shopPreferences.lattitude, shopPreferences.longitude, shopId], callback);
}

//function to add shop name in the database
let nameShop = function (shopDetails, shopId, callback) {
    let status = 1;
    let created_date = helpers.getCurrentDate();
    let opening_hours = helpers.convertTime12to24(shopDetails.opening_hours);
    let closing_hours = helpers.convertTime12to24(shopDetails.closing_hours);
    return db.query(`UPDATE tbl_reseller_shop SET shop_name = ?, 
    short_description = ?, time_zone = ?, opening_hours = ?, closing_hours = ?,
    working_days_from = ?, working_days_to = ? WHERE reseller_shop_id = ?`,
        [shopDetails.shop_name, shopDetails.short_description,
        shopDetails.time_zone, opening_hours, closing_hours,
        shopDetails.working_days_from, shopDetails.working_days_to, shopId],
        callback);
}

//Check whether user exists or not in the system
let userExists = function (userId, callback) {
    return db.query(`SELECT * FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Check whether the shop has already been created or not
let shopExists = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE reseller_shop_id = ? `, [shopId], callback);
}

//Check if shop exists against shopId
let shopExistsAgainstShopId = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE reseller_shop_id = ? `, [shopId], callback);
}


//Function to make shop inactive
let updateShopStatus = function (status, shopId, callback) {
    let dbStatus;
    if (status === 'active') {
        dbStatus = 1;
    } else if (status === 'inactive') {
        dbStatus = 0;
    }
    return db.query(`UPDATE tbl_reseller_shop SET status = ? 
    WHERE reseller_shop_id = ? `, [dbStatus, shopId], callback);
}

//Function to add payment method into database
let addPaymentMethod = function (paymenthMethod, shopId, callback) {
    return db.query(`INSERT INTO tbl_payment_method(payment_method_name, 
        fk_shop_id ) VALUES(?,?)`, [paymenthMethod, shopId], callback);
}

//Function to get all payment methods of a shop
let getPaymentMethods = function (shopId, callback) {
    return db.query(`SELECT payment_method_id, payment_method_name FROM tbl_payment_method 
    WHERE fk_shop_id = ?`, [shopId], callback);
}

//Function to update payment method into database
let removePaymentMethod = function (paymentMethodId, callback) {
    return db.query(`DELETE FROM tbl_payment_method WHERE payment_method_id = ?`,
        [paymentMethodId], callback);
}

//Function to check whether shop name is available or not
let shopNameExists = function (shopName, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE shop_name = ?`, [shopName], callback);
}

//Function to add shipping details of a shop
let addShippingDetails = function (shopShippingDetails, shopId, callback) {
    return db.query(`UPDATE tbl_reseller_shop SET shipping_type = ?,
    proccess_time = ?, shipping_cost = ?, shipping_origin = ?, 
    free_shippment = ? WHERE reseller_shop_id = ?`,
        [shopShippingDetails.shipping_type, shopShippingDetails.proccess_time,
        shopShippingDetails.shipping_cost, shopShippingDetails.shipping_origin,
        shopShippingDetails.free_shippment, shopId], callback);
}

//Function to add shipping cost against a shopId
let addAdditionalCost = function (shippingCost, shopId, callback) {
    return db.query(`INSERT INTO tbl_shipping_weight_cost(weight, 
        additional_cost, fk_shop_id) VALUES(?,?,?)`, [shippingCost.weight,
        shippingCost.additional_cost, shopId], callback);
}

//Function to add shop as favourite
let addFavouriteShop = function (shopId, userId, callback) {
    let currentDate = helpers.getCurrentDate();
    return db.query(`INSERT INTO tbl_users_fav_shops (fk_tbl_shop_shop_id, fk_tbl_users_users_id, 
        date_created) VALUES(?,?,?)`, [shopId, userId, currentDate], callback);
}

module.exports = {
    shopPreferences,
    updateShopPreferences,
    nameShop,
    userExists,
    shopExists,
    shopExistsAgainstShopId,
    updateShopStatus,
    addPaymentMethod,
    getPaymentMethods,
    removePaymentMethod,
    shopNameExists,
    addShippingDetails,
    addAdditionalCost,
    addFavouriteShop,
}