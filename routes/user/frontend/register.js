const express = require('express');
const registerRouter = express.Router();
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/user/frontend/register');

//API endpoint for the user to be registered
registerRouter.post('/register', multipart.fields([]), handler.registerUser);

// API endpoint to verify user
registerRouter.get('/verify/:userId', multipart.fields([]), handler.verify);

//API endpoint to resend verification email
registerRouter.post('/resendverificationemail', multipart.fields([]), handler.resendVerficationEmail);

module.exports = registerRouter;