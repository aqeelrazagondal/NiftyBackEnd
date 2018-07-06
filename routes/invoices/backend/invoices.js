const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/invoices/backend/invoices');
const { checkPermission } = require('../../../acl/checkPermission');
const userAuth = require('../../../middleware/authentication');

const invoiceRouter = express.Router();

//API endpoint to get all of invoices recoreds against a shopId.
invoiceRouter.get('/all/:shopId', multipart.fields([]), userAuth, checkPermission('/invoice/all/:shopId', 'GET'), handler.getInvoice);

//API ednpoint get a particular invoice record details.
invoiceRouter.get('/single/:invoiceNumber', multipart.fields([]), userAuth, checkPermission('/invoice/single/:invoiceNumber', 'GET'), handler.getSingleInvoice);

module.exports = invoiceRouter;