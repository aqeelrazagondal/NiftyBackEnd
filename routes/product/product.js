//Frontend routes
const frontProduct = require('./frontend/product');
const frontendProductCategory = require('./frontend/productCategory');
//Backend routes
const backProduct = require('./backend/product');
const backProductCateogory = require('./backend/productCategory');
const backProductImage = require('./backend/productImage');


module.exports = {
    backProduct,
    backProductCateogory,
    backProductImage,
    frontProduct,
    frontendProductCategory
}