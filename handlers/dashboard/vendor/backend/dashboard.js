const model = require('../../../../models/dashboard/vendor/backend/dashboard');

//Handler to handle the request to get the count of orders
let getOrderCount = function (req, res) {
    model.getOrderCount(req.params.shopId, function (err, orderCount) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: 'not able to execute query at getOrderCount' + err
            });
        }
        if (orderCount.length) {
            return res.status(200).json({
                response: true,
                message: 'count of order: ',
                orderCount: orderCount[0].orderCount
            });
        } else {
            return res.status(500).json({
                response: false,
                message: 'no order found against shopId:  ' + req.params.shopId,
                orderCount: orderCount
            });
        }
    });
}

//Handler to handle the route to get sales of a vendor
let getSales = function (req, res) {
    model.shopExists(req.params.shopId, function (err, shopExistsResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: 'not able to execute query at shopExists' + err
            });
        }
        if (shopExistsResponse.length) {
            model.getSales(req.params.shopId, function (err, getSalesResponse) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message: 'not able to execute query at getOrderCount' + err
                    });
                }
                return res.status(200).json({
                    response: true,
                    message: 'Sales for shopId ' + req.params.shopId,
                    shopId: req.params.shopId,
                    sales: getSalesResponse[0].sales
                });
            });
        } else {
            return res.status(500).json({
                response: false,
                message: 'no shop found with id: ' + req.params.shopId,
            });
        }
    });
}
//Hanlder to handle the route to get orders along with status
let getOrderDetails = function (req, res) {
    model.getOrderDetails(req.params.shopId, function (err, orderDetailsReponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: 'not able to execute query at getOrderDetails: ' + err
            });
        }
        if (orderDetailsReponse.length) {
            return res.status(200).json({
                response: true,
                message: 'order details for shopId: ' + req.params.shopId,
                orderDetails: orderDetailsReponse
            });
        } else {
            return res.status(404).json({
                response: false,
                message: 'No order found with shopId: ' + req.params.shopId
            });
        }
    });
}

//Handler to get the views of a shop
let getViews = function (req, res) {
    const { shopId } = req.params;
  
    model.getViews(shopId, function (err, views) {
      if (err) {
        return res.status(500).json({
          response: false,
          message: "Not able to proccess query at: getViews."
        });
      }
      if (views.length) {
        return res.status(200).json({
          response: true,
          message: "Shop views: ",
          shopId, 
          views
        });
      } else {
        return res.status(404).json({
          response: false,
          message: "Shop not found with Id: " + shopId
        });
      }
    });
  }
module.exports = {
    getOrderCount,
    getSales,
    getOrderDetails,
    getViews
}