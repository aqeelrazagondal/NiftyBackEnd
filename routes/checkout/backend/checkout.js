const express = require('express')
const multer = require("multer");
const multipart = multer();

const { checkPermission } = require("../../../acl/checkPermission");
const userAtuh = require('../../../middleware/authentication');
const handler = require('../../../handlers/checkout/backend/checkout');

const backendCheckoutRouter = express.Router();

backendCheckoutRouter.post('/product/:userId', multipart.fields([]), userAuth, checkPermission('/checkout/product/:userId', 'POST'),
    handler.addProductInCart);

module.exports = backendCheckoutRouter;