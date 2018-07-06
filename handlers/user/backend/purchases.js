const model = require('../../../models/user/backend/purchases');

//Handler to handle the route to get all of the purchases
let getAllPurchases = function (req, res) {
    model.getAllPurchases(req.params.userId, req.query.limit, function (err, allPurchases) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at getAllPurchases" + err
            });
        }
        if (allPurchases.length) {
            return res.status(200).json({
                response: true,
                message: "purchases of user: " + req.params.userId,
                purchasesCount: allPurchases.length,
                purchases: allPurchases
            });
        } else {
            return res.status(500).json({
                response: false,
                message: "No purchase found with userId: " + req.params.userId,
            });
        }
    });
}

//Handler to handle the route to get a single purchase details
let getSinglePurchase = function (req, res) {
    let finalResponse = {
    };
    model.getOrders(req.params.orderId, function (err, order) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at getOrderIds" + err
            });
        }
        if (order.length) {
            model.getShippingAddress(order[0].shippingAddressId, function (err, shippingAddress) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message: "not able to proccess query at getOrderIds" + err
                    });
                }
                if (shippingAddress.length) {
                    finalResponse.shippingAddress = {
                        addressId: shippingAddress[0].addresses_id,
                        address: shippingAddress[0].user_address,
                        country: shippingAddress[0].user_country,
                        state: shippingAddress[0].user_state,
                        city: shippingAddress[0].user_city,
                        zipcode: shippingAddress[0].user_zipcode,
                        address2: shippingAddress[0].user_address2,
                        email: shippingAddress[0].email,
                        phone: shippingAddress[0].phone,
                    }
                    finalResponse.orderId = req.params.orderId;
                    finalResponse.customerIp = order[0].shippmentAddressId;
                    finalResponse.user = {
                        userId: order[0].userId
                    }
                    model.getOrderDetails(req.params.orderId, function (err, orderDetails) {
                        let productIds = [];
                        let shopIds = [];
                        if (err) {
                            return res.status(500).json({
                                response: false,
                                message: "not able to proccess query at getOrderDetails" + err
                            });
                        }
                        if (orderDetails.length) {
                            orderDetails.forEach(orderDetail => {
                                productIds.push(orderDetail.fk_product_id);
                                shopIds.push(orderDetail.shopId);
                            });
                            model.getShop(shopIds, function (err, shops) {
                                if (err) {
                                    return res.status(500).json({
                                        response: false,
                                        message: "not able to proccess query at getShop" + err
                                    });
                                }
                                if (shops.length) {
                                    shops.forEach((shop) => {
                                        finalResponse.itemDetails = orderDetails;
                                        for (let i = 0; i < finalResponse.itemDetails.length; i++) {
                                            if (shop.shopId === finalResponse.itemDetails[i].shopId) {
                                                finalResponse.itemDetails[i].shopName = shop.shop_name;
                                                finalResponse.itemDetails[i].vendorId = shop.vendorId;
                                                finalResponse.itemDetails[i].shopDescript = shop.description;
                                            }
                                        }
                                    });
                                    model.getProduct(productIds, function (err, products) {
                                        if (err) {
                                            return res.status(500).json({
                                                response: false,
                                                message: "not able to proccess query at getProduct" + err
                                            });
                                        }
                                        if (products.length) {
                                            products.forEach((product) => {
                                                for (let j = 0; j < finalResponse.itemDetails.length; j++) {
                                                    finalResponse.itemDetails[j].prdouctName = product.name;
                                                    finalResponse.itemDetails[j].decription = product.decription;
                                                }
                                            });
                                            model.getUser(finalResponse.user.userId, function (err, user) {
                                                if (err) {
                                                    return res.status(500).json({
                                                        response: false,
                                                        message: "not able to proccess query at getUser" + err
                                                    });
                                                }
                                                if (user.length) {
                                                    finalResponse.user.name = user[0].firstName + ' ' + user[0].lastName;
                                                    finalResponse.user.state = user[0].ser_state;
                                                    finalResponse.user.city = user[0].user_city;
                                                    finalResponse.user.email = user[0].user_email;
                                                    finalResponse.user.phone = user[0].user_phone;
                                                    finalResponse.user.zipcode = user[0].user_zipcode;
                                                    finalResponse.user.country = user[0].user_country;
                                                    finalResponse.user.billingAddress = user[0].billing_address;
                                                    return res.status(200).json({
                                                        response: true,
                                                        message: 'Purchase details: ',
                                                        purchaseDetails: finalResponse
                                                    });
                                                } else {
                                                    return res.status(500).json({
                                                        response: false,
                                                        message: 'Something went wrong! '
                                                    });
                                                }
                                            });
                                        } else {
                                            return res.status(500).json({
                                                response: false,
                                                message: 'Something went wrong.. '
                                            });
                                        }
                                    });
                                } else {
                                    return res.status(500).json({
                                        response: false,
                                        message: 'Something went wrong.! '
                                    });
                                }
                            });
                        } else {
                            return res.status(404).json({
                                response: false,
                                message: 'not able to find order details for orderId: ' + req.params.orderId
                            });
                        }
                    });
                } else {
                    return res.status(500).json({
                        response: false,
                        message: 'Something went wrong.. '
                    });
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message: 'No order found with orderId: ' + req.params.orderId
            });
        }
    });
}

module.exports = {
    getAllPurchases,
    getSinglePurchase,
}