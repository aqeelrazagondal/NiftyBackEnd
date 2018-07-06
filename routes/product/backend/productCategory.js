const express = require("express");
const multer = require("multer");
const multipart = multer();

const handler = require("../../../handlers/product/backend/productCategory");
const { checkPermission } = require("../../../acl/checkPermission");

const userAuth = require('../../../middleware/authentication');

const productCategoryRouter = express.Router();

//API endpoint to add a product category
productCategoryRouter.post(
  "/addproductcategory",
  multipart.fields([]),
  userAuth, 
  checkPermission("/product/addproductcategory", "POST"),
  handler.addProductCategory
);

module.exports = productCategoryRouter;
