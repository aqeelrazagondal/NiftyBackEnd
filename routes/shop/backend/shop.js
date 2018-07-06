const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/shop/backend/shop');
const { checkPermission } = require('../../../acl/checkPermission');
const userAuth = require('../../../middleware/authentication');

const backShopRouter = express.Router();

//API endpoint to add a shop against a user
backShopRouter.post('/shoppreference/:userId', multipart.fields([]), userAuth, checkPermission('/shop/shoppreference/:userId', 'POST'), handler.shopPreferences);


//API endpoint to update shop preference
backShopRouter.put('/updateshoppreference/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/updateshoppreference/:shopId', 'PUT'), handler.updateShopPreferences);

//API endpoint to add shop details
backShopRouter.put('/shopdetails/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/shopdetails/:shopId', 'PUT'), handler.nameShop);

//API endpoint to update shop status
backShopRouter.patch('/update/shopstatus/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/update/shopstatus/:shopId', "PATCH"), handler.updateShopStatus);

//API endpoint to add payment method
backShopRouter.post('/paymentmethod/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/paymentmethod/:shopId', "POST"), handler.addPaymentMethod);

//API endpoint to get payment methods of a shop
backShopRouter.get('/paymentmethod/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/paymentmethod/:shopId', "GET"), handler.getPaymentMethods);

//API endpoint to remove or delete a payment method
backShopRouter.delete('/paymentmethod/:paymentMethodId', multipart.fields([]), userAuth, checkPermission('/shop/paymentmethod/:paymentMethodId', "DELETE"), handler.removePaymentMethod);

//API endpoint to add shipping details of a shop
backShopRouter.patch('/shippingdetails/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/shippingdetails/:shopId', "PATCH"), handler.addShippingDetails);

//API endpoint to add aditional costs of a shop
backShopRouter.post('/additionalcost/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/additionalcost/:shopId', "POST"), handler.addAdditionalCost);

//API endpoint to check if shop name is already in use
backShopRouter.get('/shopavailable', multipart.fields([]), userAuth, checkPermission('/shop/shopavailable', "GET"), handler.shopNameAvailable);

//API endpoint to add shop as favourite
backShopRouter.post('/favourite', multipart.fields([]), userAuth, checkPermission('/shop/favourite', "POST"), handler.addFavouriteShop);

module.exports = backShopRouter;