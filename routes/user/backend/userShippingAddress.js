const express = require("express");
const multer = require("multer");
const multipart = multer();

const handler = require("../../../handlers/user/backend/userShippingAddress");
const { checkPermission } = require("../../../acl/checkPermission");

const userAuth = require('../../../middleware/authentication');

const userShippingAddressRouter = express.Router();

//API endponit for adding the shipping address of the customer
userShippingAddressRouter.post(
  "/addshippingaddress/:userId",
  multipart.fields([]), 
  userAuth, 
  checkPermission("/users/addshippingaddress/:userId", "POST"),
  handler.addShippingAddress
);

//API endpoint to get shipping addresses of a particualr user
userShippingAddressRouter.get(
  "/shippingaddresses/:userId",
  multipart.fields([]), 
  userAuth, 
  checkPermission("/users/shippingaddresses/:userId", "GET"),
  handler.getShippingAddresses
);

//API endpoint to update a shipping address by providing the ID of the shipping address
userShippingAddressRouter.put(
  "/updateshippingaddress/:addressId",
  multipart.fields([]), 
  userAuth, 
  checkPermission("/users/updateshippingaddress/:addressId", "PUT"),
  handler.updateShippingAddress
);

//API endpoint to remove a shipping address against a shipping address ID
userShippingAddressRouter.delete(
  "/removeshippingaddress/:addressId",
  multipart.fields([]), 
  userAuth,
  checkPermission("/users/removeshippingaddress/:addressId", "DELETE"),
  handler.removeShippingAddress
);

module.exports = userShippingAddressRouter;
