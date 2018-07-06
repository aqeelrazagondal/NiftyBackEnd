const db = require('../../../config/db.config');

//function to add product image details in the database
let uploadImageDetails = function(body, imageName ,pdorudctId, callback) {
    db.query(`INSERT INTO tbl_product_images(fk_tbl_product_id, image, is_default) VALUES(?,?,?)`, [pdorudctId, imageName, body.isDefault], callback);
}

//Function to check whether the product with provided id exists or not
let productExists = function(productId, callback) {
    return db.query(`SELECT product_title FROM tbl_products WHERE  product_id = ?`, [productId], callback);
}

let checkDefault = function (productId, callback) {
    return db.query(`SELECT * FROM tbl_product_images WHERE  fk_tbl_product_id = ? 
    AND is_default = 1`, [productId], callback);    
}

module.exports = {
    uploadImageDetails,
    productExists,
    checkDefault
}