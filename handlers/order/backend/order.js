const decode = require('jwt-decode');

const model = require("../../../models/order/backend/order");
const helpers = require("../../../helpers/helpers");

//Handler to handle the route for adding a new order
let addOrder = function (req, res) {
  let invoiceNumber;
  let valid = 0;
  let { orderDetails } = req.body;
  let i = 0;
  let objectNumber = 0;
  
  /////////////Validations//////////////
  ////////////////Type Validations///////////////

  //if type of fk_tbl_user_shipment_address is not valid
  if (typeof req.body.fk_tbl_user_shipment_address !== "number") {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_user_shipment_address is required as a number"
    });
  }

  //if type of invoice_amount is not valid
  if (typeof req.body.invoice_amount !== "number") {
    return res.status(422).json({
      response: false,
      message: "invoice_amount is required as a number"
    });
  }

  //if type of shipment_amount is not valid
  if (typeof req.body.shipment_amount !== "number") {
    return res.status(422).json({
      response: false,
      message: "shipment_amount is required as a number"
    });
  }

  //if type of customer_ip is not valid
  if (typeof req.body.customer_ip !== "string") {
    return res.status(422).json({
      response: false,
      message: "customer_ip is required as a string"
    });
  }

  //if type of orderDetails is not valid
  if (req.body.orderDetails === undefined || req.body.orderDetails.length === 0) {
    res.status(422).json({
      response: false,
      message: "Please provide the order details as an array."
    });
  }

  while (orderDetails.length > i) {
    if (typeof orderDetails[i].fk_product_id !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].fk_reseller_shop_id !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_price !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_quantity !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].fk_tbl_product_shipment_mode !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_shipment_charges !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_design !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_color !== 'string') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_width !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_depth !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_height !== 'number') {
      valid++;
      break;
    }
    if (typeof orderDetails[i].product_delivery_status !== 'string') {
      valid++;
      break;
    }
    if (orderDetails[i].product_delivery_date === undefined) {
      valid++;
      break;
    }
    if (
      orderDetails[i].product_delivery_status !== 'active' &&
      orderDetails[i].product_delivery_status !== 'inactive'
    ) {
      valid++;
      break;
    }
    if (helpers.isValidDate(orderDetails[i].product_delivery_date)) {
      valid++;
      break;
    }
    i++;
  }

  if (valid) {
    return res.status(422).json({
      response: false,
      message: `Please provide valid order Details (at ${i+1} number object).`
    });
  }

  //Check whether user exists or not
  model.userExists(req.params.userId, function (err, userExistsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: 'not able to execute query at userExists: ' + err
      });
    }
    if (userExistsResponse.length) {
      //Check whether the shipment address exists or not
      model.shipmentAddressExist(
        req.body.fk_tbl_user_shipment_address,
        function (err, shipmentAddressResponse) {
          if (err) {
            return console.log(
              "Not able to process query at shipmentAddressExist"
            );
          }
          if (shipmentAddressResponse.length) {
            //Get maximum invoice number and then save the order
            model.maximumInvoiceNumber(function (
              err,
              maximumInvoiceNumberResponse
            ) {
              if (err) {
                return res.status(500).json({
                  response: false,
                  message:
                    "not able to process database query at maximumInvoiceNumber" +
                    err
                });
              }
              if (maximumInvoiceNumberResponse[0].maximumInvoiceNumber === null) {
                console.log(
                  "Invoice number in database is null, hence the invoice number is 1"
                );
                invoiceNumber = 1;
              } else {
                invoiceNumber =
                  Number.parseInt(
                    maximumInvoiceNumberResponse[0].maximumInvoiceNumber
                  ) + 1;
              }
              model.addOrder(
                req.body,
                invoiceNumber,
                req.params.userId,
                function (err, addOrderResponse) {
                  if (err) {
                    return res.status(500).json({
                      response: false,
                      message:
                        "Not able to proccess database query at addOrder" + err
                    });
                  }
                  for (let i = 0; i < req.body.orderDetails.length; i++) {
                    const element = req.body.orderDetails[i];
                    ((orderDetails, orderId, i, length) => {
                      model.addOrderDetails(orderDetails, orderId, function (err, orderDetailsResponse) {
                        if (err) {
                          return res.status(500).json({
                            response: false,
                            message:
                              "Not able to proccess database query at addOrderDetails: " + err
                          });
                        }
                        if (orderDetailsResponse.affectedRows) {
                          model.updateProductCount(orderDetails.fk_product_id, orderDetails.product_quantity, function (err, success) {
                            if (err) {
                              return res.status(500).json({
                                response: false,
                                message:
                                  "not able to process query at add order updateProductCount" +
                                  err
                              });
                            }
                            if (success.affectedRows) {
                              if (i === length - 1) {
                                return res.status(200).json({
                                  response: true,
                                  message: "Order details added successfully",
                                  orderId: orderId
                                });
                              }
                            } else {
                              if (i === length - 1) {
                                return res.status(500).json({
                                  response: false,
                                  message: "Something went wrong.",
                                });
                              }
                            }
                          });
                        } else {
                          return res.status(500).json({
                            response: false,
                            message: "something went wrong."
                          });
                        }
                      });
                    })(element, addOrderResponse.insertId, i, req.body.orderDetails.length);
                  }
                }
              );
            });
          } else {
            return res.status(404).json({
              response: false,
              message: "Shipment address not found"
            });
          }
        }
      );
    } else {
      return res.status(404).json({
        response: false,
        message: "User not found"
      });
    }
  });
};

//Handler to handle the route for adding orderDetails
let addOrderDetails = function (req, res) {
  ////////////Validations/////////////

  /////////////Type Validations/////////////////
  //Check if type of fk_product_id is not valid
  if (typeof req.body.fk_product_id !== "number") {
    return res.status(422).json({
      response: false,
      message: "fk_product_id is required as a number"
    });
  }

  //Check if type of fk_reseller_shop_id is not valid
  if (typeof req.body.fk_reseller_shop_id !== "number") {
    return res.status(422).json({
      response: false,
      message: "fk_reseller_shop_id is required as a number"
    });
  }

  //Check if type of product_quantity is not valid
  if (typeof req.body.product_quantity !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_quantity is required as a number"
    });
  }

  //Check if type of fk_tbl_product_shipment_mode is not valid
  if (typeof req.body.fk_tbl_product_shipment_mode !== "number") {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_product_shipment_mode is required as a number"
    });
  }

  //Check if type of product_shipment_charges is not valid
  if (typeof req.body.product_shipment_charges !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_shipment_charges is required as a number"
    });
  }

  //Check if type of product_design is not valid
  if (typeof req.body.product_design !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_design is required as a number"
    });
  }

  //Check if type of product_color is not valid
  if (typeof req.body.product_color !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_color is required as a string"
    });
  }

  //Check if type of product_width is not valid
  if (typeof req.body.product_width !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_width is required as a number"
    });
  }

  //Check if type of product_depth is not valid
  if (typeof req.body.product_depth !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_depth is required as a number"
    });
  }

  //Check if type of product_height is not valid
  if (typeof req.body.product_height !== "number") {
    return res.status(422).json({
      response: false,
      message: "product_height is required as a number"
    });
  }

  //Check if type of product_delivery_status is not valid
  if (typeof req.body.product_delivery_status !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_delivery_status must be string"
    });
  }

  //Check if type of product_delivery_status is not valid
  if (!helpers.isValidDate(req.body.product_delivery_date)) {
    return res.status(422).json({
      response: false,
      message:
        "product_delivery_date is not valid, should be in the format of 'yyyy/mm/dd' e.g: 2018/03/16"
    });
  }

  ///After Validations add order details
  //Check whether the order id exists or not
  model.orderExists(req.params.orderId, function (err, orderExistsResponse) {
    if (err) {
      return console.log(
        "Not able to process database query at orderExists" + err
      );
    }
    //If order exists
    if (orderExistsResponse.length) {
      //Check whether the product eixts or not
      model.productExists(req.body.fk_product_id, function (
        err,
        productExistsRespnose
      ) {
        if (err) {
          return console.log(
            "Not able to process database query at orderExists" + err
          );
        }
        //If the product exits
        if (productExistsRespnose.length) {
          //Check whether the Reseller Shop exists or not
          model.shopExists(req.body.fk_reseller_shop_id, function (
            err,
            shopExistsResponse
          ) {
            if (err) {
              return console.log(
                "Not able to process database query at shopExists" + err
              );
            }
            //If Shop exists
            if (shopExistsResponse.length) {
              //Check whether the shipment mode exists or not
              model.shipmentModeExists(
                req.body.fk_tbl_product_shipment_mode,
                function (err, shipmentModeExistsResponse) {
                  if (err) {
                    return console.log(
                      "Not able to process database query at shopExists" + err
                    );
                  }
                  if (shipmentModeExistsResponse.length) {
                    //Add the order details in the database
                    model.addOrderDetails(
                      req.body,
                      req.params.orderId,
                      function (err, addOrderDetailsResponse) {
                        if (err) {
                          return res.status(500).json({
                            response: false,
                            message:
                              "not able to process query at add order details" +
                              err
                          });
                        }
                        if (addOrderDetailsResponse.insertId) {
                          model.updateProductCount(req.body.fk_product_id, req.body.product_quantity, function (err, success) {
                            if (err) {
                              return res.status(500).json({
                                response: false,
                                message:
                                  "not able to process query at add order updateProductCount" +
                                  err
                              });
                            }
                            if (success.affectedRows) {
                              return res.status(200).json({
                                response: true,
                                message: "Order details added successfully",
                                orderDetailsId: addOrderDetailsResponse.insertId
                              });
                            } else {
                              return res.status(500).json({
                                response: false,
                                message: "Something went wrong.",
                                orderDetailsId: addOrderDetailsResponse.insertId
                              });
                            }
                          });
                        } else {
                          return res.status(500).json({
                            response: false,
                            message: "Failed to add order details.",
                          });
                        }
                      }
                    );
                  } else {
                    return res.status(404).json({
                      response: false,
                      message: "Shipment Mode not found"
                    });
                  }
                }
              );
            } else {
              return res.status(404).json({
                response: false,
                message: "Reseller Shop not found"
              });
            }
          });
        } else {
          return res.status(404).json({
            response: false,
            message: "Product not found"
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "Order not found"
      });
    }
  });
};


//Hanlder to handle the route to get orderIds of a particular shop
let getAllOrderIds = function (req, res) {
  //OrderId of every order of a particular shop
  let orderIds = [];
  //This array will hold all objects or order details  
  let orders = [];

  //Get all order's ids of a particular shop 
  model.getAllOrderIds(req.params.shopId, function (err, getAllOrderIdsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: 'not able to execute query at getAllOrderIds: ' + err
      });
    }
    if (getAllOrderIdsResponse.length) {
      //Push all of the ids in the orderIds array
      getAllOrderIdsResponse.forEach(element => {
        orderIds.push(element.fk_order_id);
      });
      //Loop through all of the orderIds to get order details against each orderId
      for (let j = 0; j < orderIds.length; j++) {
        const el = orderIds[j];
        ((el, j, length) => {
          //Get every order's details
          model.getOrderDetails(el, function (err, orderDetailsResponse) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: 'not able to execute query at getOrderDetails: ' + err
              });
            }
            if (orderDetailsResponse.length) {
              // push the details of the order in the array of objects
              orders.push({
                orderId: orderDetailsResponse[0].order_id,
                orderDate: orderDetailsResponse[0].order_date,
                invoiceAmount: orderDetailsResponse[0].invoice_amount,
                shipmentAmount: orderDetailsResponse[0].shipment_amount,
                orderStatus: orderDetailsResponse[0].order_status,
              });

              //If it's the last iteration of loop return the array of obejcts of orders as response
              if (j === length - 1) {
                return res.status(200).json({
                  response: true,
                  message: 'All order details.',
                  orderDetails: orders
                });
              }
            } else {
              return res.status(500).json({
                response: false,
                message: 'something went wrong!!!'
              });
            }
          });
        })(el, j, orderIds.length);
      }
    } else {
      return res.status(404).json({
        response: false,
        message: 'No order found with shopId: ' + req.params.shopId
      });
    }
  });
}

//Get a single order details
let getSingleOrderRecord = function (req, res) {

  //Object to hold all the details of an individual order
  let orderDetails = {
    items: []
  };
  //An array to hold the ids of products
  let productIds = [];
  //An array to hold the ids of shops  
  let shopIds = [];

  //Get order details against an orderId
  model.getSingleOrder(req.params.orderId, function (err, singleOrderDetails) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: 'not able to execute query at getSingleOrder: ' + err
      });
    }
    if (singleOrderDetails.length) {
      orderDetails.orderId = singleOrderDetails[0].order_id;
      orderDetails.orderDate = singleOrderDetails[0].order_date;
      orderDetails.userId = singleOrderDetails[0].fk_tbl_user_id;
      orderDetails.orderStatus = singleOrderDetails[0].order_status;
      orderDetails.shippmentAddressId = singleOrderDetails[0].shippmentAddressId;
      orderDetails.customerIp = singleOrderDetails[0].customer_ip;

      //After adding shop details in the object representing final respons, get shipping address of the user that orderd the prodcut
      model.shipmentAddressExist(singleOrderDetails[0].shippmentAddressId, function (err, shipmentAddressResponse) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: 'not able to execute query at shipmentAddressExist: ' + err
          });
        }
        if (shipmentAddressResponse.length) {
          //Add shipping address in the object representing final response
          orderDetails.shippingAddress = {
            addressId: shipmentAddressResponse[0].addresses_id,
            userAddress: shipmentAddressResponse[0].user_address,
            country: shipmentAddressResponse[0].user_country,
            state: shipmentAddressResponse[0].user_state,
            city: shipmentAddressResponse[0].user_city,
            zipcode: shipmentAddressResponse[0].user_zipcode,
            zipcode: shipmentAddressResponse[0].user_zipcode,
            shipmentAddress: shipmentAddressResponse[0].tbl_users_shipment_addressescol
          }
          //Get billing address of the user
          model.getBillingAddress(orderDetails.userId, function (err, billingAddressDetails) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: 'not able to execute query at shipmentAddressExist: ' + err
              });
            }
            //Add billing address in the object representing final response
            if (billingAddressDetails.length) {
              orderDetails.billingAddress = {
                firstName: billingAddressDetails[0].users_first_name,
                lastName: billingAddressDetails[0].users_last_name,
                country: billingAddressDetails[0].user_country,
                city: billingAddressDetails[0].user_city,
                state: billingAddressDetails[0].ser_state,
                zipcode: billingAddressDetails[0].user_zipcode,
                billingAddress: billingAddressDetails[0].billing_address,
                email: billingAddressDetails[0].user_email,
                phoneNumber: billingAddressDetails[0].user_phone,
              }
              //Get order details of every single order
              model.getSingleOrderDetails(orderDetails.orderId, function (err, singleOrderDetails) {
                if (err) {
                  return res.status(500).json({
                    response: false,
                    message: 'not able to execute query at getSingleOrderDetails: ' + err
                  });
                }
                if (singleOrderDetails.length) {
                  //Loop through the order details and add details against every productId
                  for (let j = 0; j < singleOrderDetails.length; j++) {
                    const element = singleOrderDetails[j];
                    productIds.push(element.fk_product_id);
                    shopIds.push(element.fk_reseller_shop_id);
                    orderDetails.items.push({
                      productId: element.fk_product_id,
                      shopId: element.fk_reseller_shop_id,
                      productPrice: element.fk_reseller_shop_id,
                      productQuantity: element.product_quantity,
                      productDesign: element.product_design,
                      productColor: element.product_color,
                      productWidth: element.product_width,
                      productDepth: element.product_depth,
                      productHeight: element.product_height,
                      productDeliveryStatus: element.product_delivery_status,
                    });
                  }
                  //loop through the project ids to get details of every product id to get product details
                  for (let k = 0; k < productIds.length; k++) {
                    const productId = productIds[k];
                    ((productId, k, length) => {
                      model.getProductDetails(productId, function (err, productDetails) {
                        if (err) {
                          return res.status(500).json({
                            response: false,
                            message: 'not able to execute query at getProductDetails: ' + err
                          });
                        }
                        if (productDetails.length) {
                          //Loop through the project details and add them to the object representing final response
                          for (let l = 0; l < productDetails.length; l++) {
                            const product = productDetails[l];
                            orderDetails.items.forEach((item, index) => {
                              if (item.productId === product.product_id) {
                                item.productTitle = product.product_title;
                                item.productDescription = product.product_description
                              }
                            });
                          }

                          //Again loop through the productids to get the default image of every product
                          for (let index = 0; index < productIds.length; index++) {
                            const productId = productIds[index];
                            model.getProductImage(productId, function (err, imageNames) {
                              if (err) {
                                return res.status(500).json({
                                  response: false,
                                  message: 'not able to execute query at getProductImage: ' + err
                                });
                              }
                              if (imageNames.length) {
                                //Add image name to the response object against the product id
                                for (let indexing = 0; indexing < imageNames.length; indexing++) {
                                  const imageName = imageNames[indexing];
                                  orderDetails.items.forEach((item, index) => {
                                    if (imageName.product_id === item.productId) {
                                      item.imageName = imageName.image;
                                    }
                                  });
                                }
                              }
                            });
                          }
                          //Loop through the shopids to get shop name 
                          for (let m = 0; m < shopIds.length; m++) {
                            const shopId = shopIds[m];
                            ((shopId, k, length, m, shopIdsLength) => {
                              model.getShopName(shopId, function (err, shopName) {
                                if (err) {
                                  return res.status(500).json({
                                    response: false,
                                    message: 'not able to execute query at getShopName: ' + err
                                  });
                                }
                                if (shopName.length) {
                                  // attach shop name against the shop id of the object representing final response
                                  for (let n = 0; n < shopName.length; n++) {
                                    const element = shopName[n];
                                    orderDetails.items.forEach((item, index) => {
                                      if (item.shopId === element.shop_id) {
                                        item.shopName = element.shop_name
                                      }
                                    });
                                  }
                                  //If everything is done and is the last iteration, return the response object
                                  if (m === shopIdsLength - 1) {
                                    if (k === length - 1) {
                                      return res.status(200).json({
                                        response: true,
                                        message: 'Order details for orderId: ' + req.params.orderId,
                                        orderDetails: orderDetails
                                      });
                                    }
                                  }
                                } else {
                                  return res.status(404).json({
                                    response: false,
                                    message: 'Something went wrong. '
                                  });
                                }
                              });
                            })(shopId, k, length, m, shopIds.length);
                          }
                        } else {
                          return res.status(404).json({
                            response: false,
                            message: 'Something went wrong. '
                          });
                        }
                      });
                    })(productId, k, productIds.length);
                  }
                } else {
                  return res.status(404).json({
                    response: false,
                    message: 'Something went wrong. '
                  });
                }
              });
            } else {
              return res.status(404).json({
                response: false,
                message: 'Something went wrong. '
              });
            }
          });
        } else {
          return res.status(404).json({
            response: false,
            message: 'Something went wrong. '
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: 'No order found with id: ' + req.params.orderId
      });
    }
  });
}


//Handler to handle update order delivery status from order details
let updateOrderDeliveryStatus = function (req, res) {
  ////////////Validations/////////////

  if (req.body.delivery_status === 'pending' ||
    req.body.delivery_status === 'in process' ||
    req.body.delivery_status === 'shipped' ||
    req.body.delivery_status === 'delivered') {

    model.orderExists(req.params.orderId, function (err, orderExistsResponse) {
      if (err) {
        return console.log(
          "Not able to process database query at orderExists" + err
        );
      }
      //If order exists
      if (orderExistsResponse.length) {
        model.updateOrderDeliveryStatus(req.body.delivery_status, req.params.orderId, function (err, deliveryStatusResponse) {
          if (err) {
            return console.log(
              "Not able to process database query at orderExists" + err
            );
          }
          if (deliveryStatusResponse.affectedRows) {
            return res.status(200).json({
              response: true,
              message: 'Order delivery status in Order Details update successfully'
            });
          } else {
            return res.status(500).json({
              response: false,
              message: 'Not able to update order status in order details'
            });
          }
        });

      } else {
        return res.status(404).json({
          response: false,
          message: "order not found with orderId: " + req.params.orderId
        });
      }

    });

  } else {
    return res.status(422).json({
      response: false,
      message: "delivery status invalid, it should be 'pending','in process','shipped','delivered'"
    });
  }
}


module.exports = {
  addOrder,
  getAllOrderIds,
  getSingleOrderRecord,
  addOrderDetails,
  updateOrderDeliveryStatus
};
