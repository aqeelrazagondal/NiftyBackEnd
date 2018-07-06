const db = require('../../../config/db.config'); // Database pool instance

//Function to add the shipping address of the user
let addShippingAddress = function (shippingAddress, userId, callback) {
    let address, companyName;
    if (shippingAddress.user_address2 === undefined) {
        addresss = "";
    } else {
        addresss = shippingAddress.user_address2;
    }

    if (shippingAddress.company_name === undefined) {
        companyName = "";
    } else {
        companyName = shippingAddress.company_name;
    }

    return db.query(`INSERT INTO tbl_users_shipment_addresses(fk_tbl_users_users_id, first_name, 
        last_name, company_name, phone, user_address, user_address2, user_country, 
        user_city, user_zipcode, user_state, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, shippingAddress.first_name, shippingAddress.last_name, companyName,
            shippingAddress.phone, shippingAddress.user_address, addresss,
            shippingAddress.user_country, shippingAddress.user_city, shippingAddress.user_zipcode,
            shippingAddress.user_state, 'active'], callback);
}

//Function to get the shipping addresses against a particular user address
let getShippingAddresses = function (userId, callback) {
    return db.query(`SELECT addresses_id, user_address, user_country, user_city, user_zipcode, status from tbl_users_shipment_addresses where fk_tbl_users_users_id = ?`, [userId], callback);
}

//Function to update a particular shipping address
let updateShippingAddress = function (updatedShipmentAddress, addressId, callback) {
    return db.query(`UPDATE tbl_users_shipment_addresses SET user_address = ?, user_country = ?, user_city = ?, user_zipcode = ? where addresses_id = ?`,
        [updatedShipmentAddress.user_address, updatedShipmentAddress.user_country, updatedShipmentAddress.user_zipcode, updatedShipmentAddress.user_zipcode, addressId], callback);
}

//Function to Remove a shipping address of a particular user
let removeShippingAddress = function (addressId, callback) {
    return db.query(`DELETE FROM tbl_users_shipment_addresses where addresses_id = ?`, [addressId], callback);
}

//Function to check whether the address exists or not
let addressExists = function (addressId, callback) {
    return db.query(`SELECT * FROM tbl_users_shipment_addresses where addresses_id = ?`, [addressId], callback);
}

module.exports = {
    addShippingAddress,
    getShippingAddresses,
    updateShippingAddress,
    removeShippingAddress,
    addressExists
}