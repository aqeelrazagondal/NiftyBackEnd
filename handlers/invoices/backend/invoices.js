const model = require('../../../models/invoices/backend/invoices');

//Handler to handle the route to get order details
let getInvoice = function (req, res) {
    let tempArray = [];
    let userIds = [];
    let orderIds = [];
    let invoiceRecords = [];
    model.orderExists(req.params.shopId, function (err, orderExistsResponse) {
        let limit = Number.parseInt(req.query.limit);
        if (err) {
            return res.status(500).json({
                response: false,
                message:
                    "Not able to proccess database query at orderExists" + err
            });
        }
        if (orderExistsResponse.length) {
            if (Number.isNaN(limit)) {
                return res.status(500).json({
                    response: false,
                    message: "In valid limit, please provide a valid limit for records in the query parameter."
                });
            }

            model.getOrderDetails(req.params.shopId, req.query.limit, function (err, orderDetails) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message:
                            "Not able to proccess database query at getOrderDetails" + err
                    });
                }
                //order id and amount added to the response object
                for (let i = 0; i < orderDetails.length; i++) {
                    tempArray[i] = orderDetails[i].fk_order_id;
                    invoiceRecords.push({
                        orderId: orderDetails[i].fk_order_id,
                        date: '12/12/2018',
                        invoiceNumber: 0,
                        amount: 0,
                        customerId: 0,
                        customerName: '',
                        dueDate: orderDetails[i].product_delivery_date,
                        orderDetailsId: orderDetails[i].order_details_id,
                        orderStatus: ''
                    });
                }
                //Get unique orderIds:
                orderIds = ((array) => {
                    var seen = {}
                    return array.filter(function (unique) {
                        if (seen[unique])
                            return
                        seen[unique] = true
                        return unique
                    })
                })(tempArray);
                
                for (let j = 0; j < orderIds.length; j++) {
                    ((orderId) => {
                        model.getOrder(orderId, function (err, orderResponse) {
                            if (err) {
                                return res.status(500).json({
                                    response: false,
                                    message:
                                        "Not able to proccess database query at getOrder" + err
                                });
                            }
                            if (orderResponse.length) {
                                for (let m = 0; m < orderResponse.length; m++) {
                                    const orderElement = orderResponse[m];
                                    userIds[m] = orderElement.fk_tbl_user_id;
                                    invoiceRecords.forEach((invoiceElement, index) => {
                                        if (orderElement.order_id === invoiceElement.orderId) {
                                            invoiceElement.invoiceNumber = orderElement.invoice_no;
                                            invoiceElement.amount = orderElement.invoice_amount;
                                            invoiceElement.date = orderElement.order_date;
                                            invoiceElement.customerId = orderElement.fk_tbl_user_id
                                            invoiceElement.orderStatus = orderElement.order_status
                                        }
                                    });
                                }
                                for (let l = 0; l < userIds.length; l++) {
                                    ((userId) => {
                                        model.getUserName(userId, function (err, userNameResponse) {
                                            if (err) {
                                                return res.status(500).json({
                                                    response: false,
                                                    message:
                                                        "Not able to proccess database query at getUserName" + err
                                                });
                                            }
                                            if (userNameResponse.length) {
                                                for (let n = 0; n < userNameResponse.length; n++) {
                                                    const userName = userNameResponse[n];
                                                    invoiceRecords.forEach((element, index) => {
                                                        if (element.customerId === userName.users_id) {
                                                            element.customerName = userName.users_first_name + ' ' + userName.users_last_name
                                                        }
                                                    });
                                                    if (j === orderIds.length - 1) {
                                                        return res.status(200).json({
                                                            response: true,
                                                            message: "got order details: ",
                                                            invoiceRecordCounts: invoiceRecords.length,
                                                            invoices: invoiceRecords
                                                        });
                                                    }
                                                }
                                            } else {
                                                return res.status(500).json({
                                                    response: false,
                                                    message: "Something went wrong.."
                                                });
                                            }
                                        });
                                    })(userIds[l]);
                                }
                            } else {
                                return res.status(500).json({
                                    response: false,
                                    message: "Something went wrong!"
                                });
                            }
                        });
                    })(orderIds[j]);
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message:
                    "No order found with shopId: " + req.params.shopId
            });
        }
    });
}
//Handler to handle the route to get a single invoice record details
let getSingleInvoice = function (req, res) {
    let singleInvoiceRecord = {};
    let prodcutIds = [];
    let products = [];
    
    model.getOrderInvoice(req.params.invoiceNumber, function (err, orderInvoiceResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message:
                    "Not able to proccess database query at getOrderInvoice" + err
            });
        }
        if (orderInvoiceResponse.length) {
            //Setting single invoice record object
            singleInvoiceRecord.orderId = orderInvoiceResponse[0].order_id;
            singleInvoiceRecord.customerId = orderInvoiceResponse[0].fk_tbl_user_id;
            singleInvoiceRecord.invoiceNumber = orderInvoiceResponse[0].invoice_no;
            singleInvoiceRecord.shipmentAddressId = orderInvoiceResponse[0].fk_tbl_user_shipment_address;
            singleInvoiceRecord.orderDate = orderInvoiceResponse[0].order_date;
            singleInvoiceRecord.orderStatus = orderInvoiceResponse[0].order_status;
            singleInvoiceRecord.items = [];
            singleInvoiceRecord.shippingAddress = {};
            singleInvoiceRecord.billingDetails = {};

            model.getOrderDetailsInvoice(singleInvoiceRecord.orderId, function (err, orderDetailsResponse) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message:
                            "Not able to proccess database query at getOrderDetailsInvoice" + err
                    });
                }
                if (orderDetailsResponse.length) {
                    for (let j = 0; j < orderDetailsResponse.length; j++) {
                        const element = orderDetailsResponse[j];
                        prodcutIds.push(element.fk_product_id);
                        singleInvoiceRecord.items.push({
                            productId: element.fk_product_id,
                            cost: element.product_price,
                            quantity: element.product_quantity
                        });
                    }
                    products = singleInvoiceRecord.items;
                    for (let k = 0; k < prodcutIds.length; k++) {
                        const productId = prodcutIds[k];
                        model.getProductDetails(productId, function (err, productdetailsResponse) {
                            if (err) {
                                return res.status(500).json({
                                    response: false,
                                    message:
                                        "Not able to proccess database query at getProductDetails" + err
                                });
                            }
                            if (productdetailsResponse.length) {
                                for (let l = 0; l < products.length; l++) {
                                    const element = products[l];
                                    productdetailsResponse.forEach((el, index) => {
                                        if (el.product_id === element.productId) {
                                            element.title = el.product_title,
                                                element.description = el.product_description
                                        }
                                    });
                                }
                                if (k === prodcutIds.length - 1) {
                                    model.getShipmentAddress(singleInvoiceRecord.shipmentAddressId, function (err, shipmentAddressResponse) {
                                        if (err) {
                                            return res.status(500).json({
                                                response: false,
                                                message:
                                                    "Not able to proccess database query at getShipmentAddress" + err
                                            });
                                        }
                                        if (shipmentAddressResponse.length) {
                                            singleInvoiceRecord.shippingAddress = {
                                                adresses_id: shipmentAddressResponse[0].adresses_id,
                                                fk_tbl_users_users_id: shipmentAddressResponse[0].fk_tbl_users_users_id,
                                                user_address: shipmentAddressResponse[0].user_address,
                                                user_country: shipmentAddressResponse[0].user_country,
                                                user_city: shipmentAddressResponse[0].user_city,
                                                user_zipcode: shipmentAddressResponse[0].user_zipcode,
                                                status: shipmentAddressResponse[0].status
                                            };

                                            model.getBillingDetails(singleInvoiceRecord.customerId, function (err, billingDetailsResponse) {
                                                if (err) {
                                                    return res.status(500).json({
                                                        response: false,
                                                        message:
                                                            "Not able to proccess database query at getBillingDetails" + err
                                                    });
                                                }
                                                if (billingDetailsResponse.length) {
                                                    singleInvoiceRecord.billingDetails = {
                                                        userCountry: billingDetailsResponse[0].user_country,
                                                        userCity: billingDetailsResponse[0].user_city,
                                                        userState: billingDetailsResponse[0].ser_state,
                                                        userZipcode: billingDetailsResponse[0].user_zipcode,
                                                        userBillingAddress: billingDetailsResponse[0].billing_address
                                                    };
                                                    return res.status(200).json({
                                                        response: true,
                                                        message: "Invoice record: ",
                                                        invoiceRecord: singleInvoiceRecord
                                                    });
                                                } else {
                                                    return res.status(500).json({
                                                        response: false,
                                                        message: "something went wrong...."
                                                    });
                                                }
                                            });

                                        } else {
                                            return res.status(500).json({
                                                response: false,
                                                message:
                                                    "Not able to proccess database query at getShipmentAddress" + err
                                            });
                                        }
                                    });
                                }
                            } else {
                                return res.status(500).json({
                                    response: false,
                                    message: "something went wrong...."
                                });
                            }
                        });
                    }
                } else {
                    return res.status(404).json({
                        response: false,
                        message: "something went wrong. "
                    });
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "No order found with invoice number: " + req.params.invoiceNumber
            });
        }
    });
}

module.exports = {
    getInvoice,
    getSingleInvoice,
}