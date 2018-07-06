const express = require('express');
const multer = require("multer");

const handler = require('../../../handlers/product/backend/product');
const { checkPermission } = require("../../../acl/checkPermission");
const userAuth = require('../../../middleware/authentication');

const multipart = multer();
const productRouter = express.Router();

//API endpoint to add a new product
productRouter.post('/add', upload.array('avatar'), userAuth, checkPermission('/product/add', 'POST'), handler.addProduct);

//API endpoint to update product
productRouter.put('/updateproduct/:productId', upload.array('avatar'), userAuth,checkPermission('/product/updateproduct/:productId', 'PUT'), handler.updateProduct);

//API endpoint to update product status
productRouter.patch('/updateproductstatus/:productId', multipart.fields([]), userAuth,checkPermission('/product/updateproductstatus/:productId', 'PATCH'), handler.updateProductStatus);

//API endpoint to add product property (Variations) for a product
productRouter.post('/variations/:productId', multipart.fields([]), userAuth, checkPermission('/product/variations/:productId', 'POST'), handler.addProductProperty);

//API endpoint to add new product variations [Admin]
productRouter.post('/newvariations', multipart.fields([]), userAuth, checkPermission('/product/newvariations', "POST"), handler.addNewVariations);

//API endpoint to add new option for a variations [Admin]
productRouter.post('/variationoption/:variationId', multipart.fields([]), userAuth,checkPermission('/product/variationoption/:variationId', "POST"), handler.addVariationOptions);

//API endpoint to add favourtie products of a user.
productRouter.post('/favourite', multipart.fields([]),  handler.addFavouriteProduct);
// productRouter.post('/favourite', multipart.fields([]), userAuth, checkPermission('/product/favourite', "POST"), handler.addFavouriteProduct);

module.exports = productRouter;
