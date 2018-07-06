const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/review/backend/review');
const { checkPermission } = require('../../../acl/checkPermission');

const userAuth = require('../../../middleware/authentication');

const backReviewRouter = express.Router();

backReviewRouter.post('/:productId', multipart.fields([]), userAuth, checkPermission('/review/:productId', "POST"), handler.addReview);
backReviewRouter.get('/:reviewId', multipart.fields([]), userAuth, checkPermission('/review/:reviewId', "GET"), handler.getReview);
backReviewRouter.get('/all/:productId', multipart.fields([]), userAuth, checkPermission('/review/all/:productId', "GET"), handler.getAllReviewsProduct);
backReviewRouter.put('/update/:reviewId', multipart.fields([]), userAuth, checkPermission('/review/update/:reviewId', "PUT"), handler.updateReview);
backReviewRouter.patch('/updatestatus/:reviewId', multipart.fields([]), userAuth, checkPermission('/review/updatestatus/:reviewId', "PATCH"), handler.reviewStatus);

module.exports = backReviewRouter;