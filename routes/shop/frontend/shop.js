const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/shop/frontend/shop');

const shopRouter = express.Router();

//API endpoint to get shop with a particular range.
shopRouter.get('/shopdistance', multipart.fields([]), handler.getShopsDistance);

//API endpoint 
shopRouter.get('/details/:shopId', multipart.fields([]), handler.getShop);

module.exports = shopRouter;