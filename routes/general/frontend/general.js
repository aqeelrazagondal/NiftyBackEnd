const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/general/frontend/general');

const generalRoutes = express.Router();

generalRoutes.post('/qeuryemail', multipart.fields([]), handler.queryEmqail);

module.exports = generalRoutes;