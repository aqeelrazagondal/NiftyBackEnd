const model = require('../../../models/shop/frontend/shop');

//Hanlder to handle the route to get shops in a particular range
let getShopsDistance = function (req, res) {
  const { latitude, longitude, distance } = req.query;
  let newDistance;
  //Validate lat longs
  if (latitude < -90 || latitude > 90 || latitude === undefined) {
    return res.status(422).json({
      response: false,
      message: "Please provide latitude between -90 and 90 degrees inclusive."
    });
  }

  if (longitude < -180 || longitude > 180 || longitude === undefined) {
    return res.status(422).json({
      response: false,
      message: "Please provide longitude between -180 and 180 degrees inclusive."
    });
  }

  newDistance = Number.parseInt(distance);

  if (Number.isNaN(newDistance)) {
    return res.status(422).json({
      response: false,
      message: "Distance must be a number."
    });
  }

  model.getShopsDistance(Number.parseFloat(latitude), Number.parseFloat(longitude), Number.parseFloat(distance), function (err, success) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to proccess query at getShopsDistance." + err
      });
    }

    if (success.length) {
      return res.status(200).json({
        response: true,
        message: "List of the shops.",
        shopCount: success.length,
        shops: success
      });
    }
    
    else {
      return res.status(404).json({
        response: false,
        shopCount: 0,
        message: "No shop found in given range.",
      });
    }
  });
}

//Handler to get a shop details:
let getShop = function (req, res) {
  const { shopId } = req.params;

  if (Number.isNaN(Number.parseInt(shopId))) {
    return res.status(500).json({
      response: false,
      message: 'ShopId is required as a number.'
    });
  }

  model.getShop(shopId, function (err, shop) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: 'Not able to proccess query at: getShop ' + err,
      });
    }
    if (shop.length) {
      return res.status(200).json({
        response: true,
        message: 'Shop details: ',
        shop
      });
    } else {
      return res.status(404).json({
        response: false,
        message: 'No shop found with shopId: ' + shopId,
        shop
      });
    }
  });
}

module.exports = {
  getShopsDistance,
  getShop
}