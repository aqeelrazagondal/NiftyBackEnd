const request = require('request');
const stirpe = require("stripe")("sk_test_J2eqcG9lE7zt5Yt8hgSGaSAx");
const express = require('express');
const multer = require("multer");
const multipart = multer();

const handler = require('../../../handlers/payment/backend/payment');
const paymentConfig = require('../../../config/config.payment');

const paymentRoute = express.Router();

//API endpoint to rendor the stripe button to pay.
paymentRoute.get('/charge/get', multipart.fields([]), handler.getViewForCharge);

//API endpoint to deduct the payment of the customer
paymentRoute.post('/charge', multipart.fields([]), handler.pay);

//API endpoint to rendor the stripe button to connect the customer.
paymentRoute.get('/connect/get', multipart.fields([]), handler.getViewForConnect);

//API endpoint to redirect the customer after stripe account connectivity
paymentRoute.get('/connect/redirect', multipart.fields([]), handler.redirect);

// paymentRoute.get('/test', function (req, res) {
//     stirpe.charges.create({
//         amount: 10000,
//         description: "aTest",
//         currency: "usd",
//         application_fee: 2000,
//         destination: {
//             account: 'acct_1CIaKVKRW4kHXkvT',
//             amount: 4000
//         },
//         source: stripeToken
//     })
//         .then((success) => {
//             return res.status(200).json({
//                 response: true,
//                 message: "Payment made successfully."
//             });
//         }).catch((err) => {
//             return res.status(500).json({
//                 response: false,
//                 message: "Failed to make payment. " + err
//             });
//         });
// });

module.exports = paymentRoute;