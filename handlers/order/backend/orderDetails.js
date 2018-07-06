const model = require("../../../models/order/backend/orderDetails");
const helpers = require("../../../helpers/helpers");
const decode = require('jwt-decode');

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
      message: "product_delivery_status is required as a string"
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
  addOrderDetails,
  updateOrderDeliveryStatus
};
