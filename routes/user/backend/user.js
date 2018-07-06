const express = require("express");
const multer = require("multer");
const multipart = multer();

const backUserRouter = express.Router();

const handler = require("../../../handlers/user/backend/user");
const { checkPermission } = require("../../../acl/checkPermission");

const userAuth = require('../../../middleware/authentication');

//API endpoint to get the user against the userId as the parameter
backUserRouter.get("/:userId", multipart.fields([]), userAuth, checkPermission("/users/:userId", "GET"), handler.getUser);

//API endpoint for updating the user instance
backUserRouter.put("/update/:userId", multipart.fields([]), userAuth, checkPermission("/users/update/:userId", "PUT"), handler.updateUser);

//API endpoint for updating the status of the user (Enable or Disable the user)
backUserRouter.patch("/updateuserstatus/:userId", multipart.fields([]), userAuth, checkPermission("/users/updateuserstatus/:userId", "PATCH"), handler.updateUserStatus);

//API endpoint for updating user password
backUserRouter.patch("/updatepassword/:userId", multipart.fields([]), userAuth, checkPermission("/users/updatepassword/:userId", "PATCH"), handler.updatePassword);

//API endpoint to update user's email address
backUserRouter.patch('/updateemail/:userId', multipart.fields([]), userAuth, checkPermission('/users/updateemail/:userId', 'PATCH'), handler.updateEmail);

//API endpoint to add user profile
backUserRouter.put('/add/profile/:userId', multipart.fields([]), userAuth, checkPermission('/users/add/profile/:userId', 'PUT'), handler.addUserProfile);

module.exports = backUserRouter;
