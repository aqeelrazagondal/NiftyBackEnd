const express = require('express');
const multer = require("multer");

const loginRouter = express.Router();
const multipart = multer();

const handler = require('../../../handlers/user/frontend/login');

//API endpoint for user to login
loginRouter.post('/login', multipart.fields([]), handler.loginUser);

//API endpoint for forgot password
loginRouter.post('/forgotpassword', multipart.fields([]), handler.forgotPassword);

//API endpoint to update password
loginRouter.post('/resetpassword/:userId', multipart.fields([]), handler.resetPassword);

module.exports = loginRouter;
