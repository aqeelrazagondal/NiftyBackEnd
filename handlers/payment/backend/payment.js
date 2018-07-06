const stirpe = require("stripe")("sk_test_J2eqcG9lE7zt5Yt8hgSGaSAx");
const request = require("request");
// const buffer = require('buffer');
const paymentConfig = require("../../../config/config.payment");
const model = require('../../../models/payment/backend/payment');

const redirectUrl = 'http://www.niftyhub.com?redirect=1';

//Handler to handle the route get view for user to pay
let getViewForCharge = function (req, res) {
    const { vendors, orderId } = req.query;
    //the vendors object from query parameter in the form of json
    let jsonVendor = JSON.parse(vendors);
    let queryParameters = [];
    let amount = 0;

    if (vendors === undefined) {
        return res.json({
            response: false,
            message: "Please provide the vendor details (Id and amount of each vendor.)"
        });
    }

    // if (orderId) {
    //     return res.json({
    //         response: false,
    //         message: "Please provide the orderId."
    //     });
    // }

    jsonVendor.forEach((vendorObject, index) => {
        amount += vendorObject.amount;
        //the vendors object from query parameter in the form of string            
        let stringVendor = JSON.stringify(vendorObject);
        //Encoding the parameter
        let endcodedVendor = Buffer.from(stringVendor).toString('base64');
        //Addin the encoded parameter in the array to be passed in the uri
        queryParameters.push(endcodedVendor);
    });
    // localhost:3000/payment/charge/get?vendors=[{"id":414, "amount": 30}, {"id":438, "amount": 30}]
    //vendors=[{"id":1, "amount": 30}]
    return res.render("pay", {
        amount,
        queryParameters
    });
};

//Handler to handle the route to pay the payment after confirming the order.
let pay = function (req, res) {
    const { vendors } = req.query;
    const { stripeEmail, stripeToken } = req.body;
    const adminCharges = 10000;
    let vendorsList = [];
    let splitedArray = [];
    let destination = [];
    let vendorIds = [];
    let totalOrderAmount = 0;
    let amount = 0;
    let jsonVendor = JSON.parse(vendors)[0];
    let description = "Payment for an order on NiftyHub.";
    let currency = "usd";

    if (vendors === undefined) {
        return res.json({
            response: false,
            message: "Please provide the vendor details (Id and amount of each vendor.)"
        });
    }


    splitedArray = jsonVendor.split(',')

    splitedArray.forEach((vendorObject) => {
        let decoded = Buffer.from(vendorObject, 'base64').toString('ascii');
        vendorsList.push(JSON.parse(decoded));
    });

    //Puttin vendorIds in a seperate array.
    vendorsList.forEach((vendor) => {
        vendorIds.push(vendor.id);
        totalOrderAmount += vendor.amount
    });

    amount = totalOrderAmount + adminCharges;

    model.userExists(vendorIds, function (err, success) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: 'Failed to execute query at userExists : ' + err
            });
        }
        if (success.length === vendorIds.length) {
            for (let i = 0; i < vendorsList.length; i++) {
                let vendor = vendorsList[i];
                for (let j = 0; j < success.length; j++) {
                    let element = success[j];
                    if (vendor.id === element.users_id) {
                        destination.push({
                            account: element.stripe_user_id,
                            amount: vendor.amount
                        });
                    }
                }
            }

            stirpe.customers.create({
                email: stripeEmail,
                source: stripeToken,
            })
                .then((customer) => {
                    //Admin Charges///
                    stirpe.charges.create({
                        amount: adminCharges,
                        description,
                        currency,
                        customer: customer.id
                    }).then((charge) => {
                        //Once Admin's charge is created, charging for vendors.
                        for (let i = 0; i < destination.length; i++) {
                            const vendor = destination[i];
                            ((vendor) => {
                                stirpe.charges.create({
                                    amount: vendor.amount,
                                    description,
                                    currency,
                                    destination: {
                                        account: vendor.account,
                                        amount: vendor.amount
                                    },
                                    customer: customer.id
                                }).then((charge) => {
                                    return res.redirect(redirectUrl);
                                })
                                    .catch(() => {
                                        res.status(500).json({
                                            response: false,
                                            err: err.code,
                                            errMessage: err.message
                                        });
                                    });
                            })(vendor)
                        }
                    })
                        .catch(() => {
                            res.status(500).json({
                                response: false,
                                err: err.code,
                                errMessage: err.message
                            });
                        });
                })
                .then((customer) => {
                })
                .catch(() => {
                    res.status(500).json({
                        response: false,
                        err: err.code,
                        errMessage: err.message
                    });
                });
        } else {
            return res.status(500).json({
                response: false,
                message: 'Some or all vendorIds or not valid.'
            });
        }
    });
};

//Handler to handle the route get view for user to connect
let getViewForConnect = function (req, res) {
    const { vendorId } = req.query;
    return res.render("connect", {
        vendorId
    });
};

//Handler to handle the redirect route once the user is connect with the stripe account
let redirect = function (req, res) {
    const { code, state } = req.query;
    let vendorId = state;
    // Post the authorization code to Stripe to complete the authorization flow.
    request.post(
        paymentConfig.stripe.tokenUri,
        {
            form: {
                grant_type: "authorization_code",
                client_id: paymentConfig.stripe.clientId,
                client_secret: paymentConfig.stripe.secretKey,
                code: req.query.code
            },
            json: true
        },
        (err, response, body) => {
            if (err || body.error) {
                return res.status(500).json({
                    response: false,
                    message: "The Stripe onboarding process has not succeeded."
                });
            } else {
                const {
                    access_token,
                    livemode,
                    refresh_token,
                    token_type,
                    stripe_publishable_key,
                    stripe_user_id,
                    scope
                } = body;

                model.connectVendor(vendorId, stripe_user_id, function (err, success) {
                    if (err) {
                        return res.status(500).json({
                            response: false,
                            message: "not able to proccess query at connectVendor " + err
                        });
                    }
                    if (success.affectedRows) {
                        return res.redirect(redirectUrl);
                    } else {
                        return res.status(500).json({
                            response: false,
                            message: `Vendor not found with Id: ` + vendorId
                        });
                    }
                });

                //////BODY Contains:
                /*
                    { access_token: 'sk_test_DhM7itFbUzU89dRUG2dPOovP',
                       livemode: false,
                       refresh_token: 'rt_Ci1e1niScIYz06r2xw6Fgyddwo40IxK1nVyEZrM6sYS0jurI',
                       token_type: 'bearer',
                       stripe_publishable_key: 'pk_test_W69twdXvQWXAB95UCTxs6p9U',
                       stripe_user_id: 'acct_1CIXWuFVZ8VTZkoo',
                       scope: 'express' }
                    */
            }
        }
    );
};
module.exports = {
    pay,
    getViewForCharge,
    getViewForConnect,
    redirect
};
