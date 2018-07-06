const express = require('express');
const multer = require("multer");
const multipart = multer();

const registerAdminRouter = express.Router();

const handler = require('../../../handlers/user/frontend/registerAdmin');

registerAdminRouter.post('/register', multipart.fields([]), handler.addAdmin);

module.exports = registerAdminRouter;