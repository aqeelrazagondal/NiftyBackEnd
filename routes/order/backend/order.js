const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/order/backend/order');
const { checkPermission } = require('../../../acl/checkPermission');
const userAuth = require('../../../middleware/authentication');

const orderRouter = express.Router();

//Authenticate user
orderRouter.use(userAuth);

//API endpoint to add a new order
orderRouter.post('/add/:userId', multipart.fields([]), userAuth, checkPermission('/order/add/:userId', 'POST'), handler.addOrder);

//API endpoint to get all orders.
orderRouter.get('/all/:shopId', multipart.fields([]), userAuth, checkPermission('/order/all/:shopId', 'GET'), handler.getAllOrderIds);

//API endpoint to get a single order details.
orderRouter.get('/single/:orderId', multipart.fields([]), userAuth, checkPermission('/order/single/:orderId', 'GET'), handler.getSingleOrderRecord);

orderRouter.patch('/updatedeliverystatus/:orderId',
    multipart.fields([]),
    userAuth,
    checkPermission('/order/updatedeliverystatus/:orderId', 'PATCH'),
    handler.updateOrderDeliveryStatus);

module.exports = orderRouter;