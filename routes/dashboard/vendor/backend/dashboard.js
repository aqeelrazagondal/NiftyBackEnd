const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../../handlers/dashboard/vendor/backend/dashboard');
const { checkPermission } = require('../../../../acl/checkPermission');
const userAuth = require('../../../../middleware/authentication');

const vendorDashboardRouter = express.Router();

//API endpoint to get order count of a shop
vendorDashboardRouter.get('/vendor/ordercount/:shopId', multipart.fields([]), userAuth, checkPermission('/dashboard/vendor/ordercount/:shopId', 'GET'), handler.getOrderCount);

//API endpoint to get sales of a shop
vendorDashboardRouter.get('/vendor/sales/:shopId', multipart.fields([]), userAuth, checkPermission('/dashboard/vendor/sales/:shopId', 'GET'), handler.getSales);

//API endpoint to get order details of a shop
vendorDashboardRouter.get('/vendor/orderdetails/:shopId', multipart.fields([]), userAuth, checkPermission('/dashboard/vendor/orderdetails/:shopId', 'GET'), handler.getOrderDetails);

//API endpoint to get views of a shop
vendorDashboardRouter.get('/vendor/veiws/:shopId', multipart.fields([]), userAuth, checkPermission('/shop/veiws/:shopId', "GET"), handler.getViews);

module.exports = vendorDashboardRouter;