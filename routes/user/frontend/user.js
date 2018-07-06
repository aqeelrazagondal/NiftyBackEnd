const express = require('express');
const multer = require("multer");
const multipart = multer();

const frontUserRouter = express.Router();

module.exports = frontUserRouter;