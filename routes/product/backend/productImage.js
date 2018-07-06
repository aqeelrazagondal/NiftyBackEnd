const express = require('express');

const handler = require('../../../handlers/product/backend/productImage');
const userAuth = require('../../../middleware/authentication');
const { checkPermission } = require("../../../acl/checkPermission");

const productImageRouter = express.Router();

//API endpoint to upload the image of a parduct.
productImageRouter.post('/uploadImage/:productId', upload.single('avatar'), userAuth, checkPermission('/product/uploadImage/:productId', 'POST') ,handler.uploadImageDetails);

module.exports = productImageRouter
