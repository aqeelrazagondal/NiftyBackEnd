const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/commission/backend/commission');
const { checkPermission } = require('../../../acl/checkPermission');
const userAuth = require('../../../middleware/authentication');

const commissionRouter = express.Router();

commissionRouter.post('/addcommission', multipart.fields([]), userAuth, checkPermission('/admin/addcommission', 'POST'), handler.addCommission);
commissionRouter.put('/updatecommission/:commissionId', multipart.fields([]), userAuth, checkPermission('/admin/updatecommission/:commissionId', 'PUT'), handler.updateCommission);

module.exports = commissionRouter;