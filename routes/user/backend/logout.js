const express = require('express');
const multer = require("multer");
const multipart = multer();

const backLogoutRouter = express.Router();

const handler = require('../../../handlers/user/backend/logout');
const { checkPermission } = require("../../../acl/checkPermission");
const userAuth = require('../../../middleware/authentication');

backLogoutRouter.post('/logout', multipart.fields([]), userAuth, checkPermission('/users/logout', 'POST'), handler.logout);

module.exports = backLogoutRouter;