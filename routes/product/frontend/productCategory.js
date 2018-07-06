const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/product/frontend/productCategory');

const productCategoryRouter = express.Router();

//API endpoint to get product categories
productCategoryRouter.get('/productcategory', multipart.fields([]), handler.getCategories);

module.exports = productCategoryRouter;