const express = require("express");

const handler = require("../../../handlers/user/backend/userImage");
const { checkPermission } = require("../../../acl/checkPermission");
const userAuth = require('../../../middleware/authentication');

const userImageRouter = express.Router();

//API endpoint to upload user image
userImageRouter.post(
  "/uploaduseriamge/:userId",
  upload.single("avatar"),
  userAuth, 
  checkPermission("/users/uploaduseriamge/:userId", "POST"),
  handler.saveUserImage
);

module.exports = userImageRouter;
