const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/product/frontend/product');

const productRouter = express.Router();

//API endpoint to get all the products of a shop
productRouter.get('/all/:shopId', multipart.fields([]), handler.getAllProducts);

//Get popular products
productRouter.get('/popular', multipart.fields([]), handler.getPopularProdcts);

//Get popular products of a shop
productRouter.get('/popular/:shopId', multipart.fields([]), handler.getPopularProdctsShop);

//Route to add views of a product
productRouter.post('/view', multipart.fields([]), handler.addView);

//Route to get most viewed products
productRouter.get('/viewed', multipart.fields([]), handler.getMostViewedProducts)

//Route to get most viewed products of a shop
productRouter.get('/viewed/:shopId', multipart.fields([]), handler.getMostViewedProductsShop);

//Route to get the products by category
productRouter.get('/categoryproduct/:categoryId', multipart.fields([]), handler.getCategoryProducts);

//Route to get the products of recent View 
productRouter.get('/recentView/:ip', multipart.fields([]), handler.recentView);

//Route to get the product Details
productRouter.get('/:id', multipart.fields([]), handler.getProdctDetails);

//Route to get product by shop ID
productRouter.get('shopid/:id', multipart.fields([]), handler.getProdctByShopId);

//Route to get product by shop ID
productRouter.post('/mostViewProductOfShop', multipart.fields([]), handler.getMostViewedProducts);



module.exports = productRouter;