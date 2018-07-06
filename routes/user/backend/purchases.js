const express = require('express');
const multer = require("multer");
const multipart = multer();

const backPurchasesRoute = express.Router();

const handler = require('../../../handlers/user/backend/purchases');
const { checkPermission } = require("../../../acl/checkPermission");
const userAuth = require('../../../middleware/authentication');

//Route to get all of the purchases of a user
backPurchasesRoute.get('/purchases/:userId', multipart.fields([]), userAuth, checkPermission('/users/purchases/:userId', 'GET'), handler.getAllPurchases);

//Route to get a single purchas against an orderId
backPurchasesRoute.get('/purchase/:orderId', multipart.fields([]), userAuth, checkPermission('/users/purchase/:orderId', 'GET'), handler.getSinglePurchase);

module.exports = backPurchasesRoute;
