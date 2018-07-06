const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/commission/backend/commissionrecords');
const { checkPermission } = require('../../../acl/checkPermission');
const userAuth = require('../../../middleware/authentication');

const commissionRecordRouter = express.Router();

commissionRecordRouter.post('/addcommissionrecord/:vendorId', multipart.fields([]), userAuth, checkPermission('/vendor/addcommissionrecord/:vendorId', 'POST'), handler.addCommissionRecord);
commissionRecordRouter.get('/commissionrecords/:vendorId', multipart.fields([]), userAuth, checkPermission('/vendor/commissionrecords/:vendorId', 'GET'), handler.getCommissionRecords);

module.exports = commissionRecordRouter;