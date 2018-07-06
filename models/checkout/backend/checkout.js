const db = require('../../../config/db.config');

//Function to add product in cart
let addProductInCart = function (productId, callback) {
    return db.query(`INSERT INTO....`);
}

module.exports = {
    addProductInCart
}