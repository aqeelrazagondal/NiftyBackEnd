const decode = require('jwt-decode');
const countries = require('country-list')();
const cities = require('cities-list');

const model = require("../../../models/shop/backend/shop");
const helpers = require("../../../helpers/helpers");

//Handler to handle the api for adding a new shop
let shopPreferences = function (req, res) {
  ///////////////////////////Validations/////////////////////////

  ////////////////Type Validations///////////////
  ///////Country Validations/////////
  if (typeof req.body.country !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Country is required, please enter a valid country."
    });
  }

  if (typeof req.body.city !== 'string') {
    return res.status(422).json({
      response: false,
      message: "city is required, please enter a valid country."
    });
  }

  if (countries.getCode(req.body.country) === undefined) {
    return res.status(422).json({
      response: false,
      message: "Country is not valid, please enter valid country"
    });
  }

  //Check if city provided is valid or not 
  if (cities[helpers.capitalize(req.body.city)] === undefined) {
    return res.status(422).json({
      response: false,
      message: "City is not valid, please enter valid city"
    });
  }

  //Check whether shop_address is string or not
  if (typeof req.body.shop_address !== "string") {
    return res.status(422).json({
      response: false,
      message: "shop_address is required as string"
    });
  }

  //Check whether shop_zipcode is string or not
  if (typeof req.body.shop_zipcode !== "string") {
    return res.status(422).json({
      response: false,
      message: "shop_zipcode is required as string"
    });
  }

  if (typeof req.body.longitude !== 'number') {
    return res.status(422).json({
      response: false,
      message: "longitude is required as a number."
    });
  }

  if (typeof req.body.lattitude !== 'number') {
    return res.status(422).json({
      response: false,
      message: "lattitude is required as a number."
    });
  }

  //Validate lat longs
  if (req.body.lattitude < -90 || req.body.lattitude > 90) {
    return res.status(422).json({
      response: false,
      message: "Latitude must be between -90 and 90 degrees inclusive."
    });
  }

  else if (req.body.longitude < -180 || req.body.longitude > 180) {
    return res.status(422).json({
      response: false,
      message: "Longitude must be between -180 and 180 degrees inclusive."
    });
  }
  ///After validating add shop
  model.shopPreferences(req.body, req.params.userId, function (
    err,
    shopPreferencesResponse
  ) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(500).json({
          response: false,
          message: "User already have a shop."
        });
      }
      if (err.code === "ER_NO_REFERENCED_ROW_2"
        || err.code === "ER_NO_REFERENCED_ROW") {
        return res.status(422).json({
          response: false,
          message: "User not found with Id: " + req.params.userId
        });
      }
      return res.status(500).json({
        response: false,
        message: "not able to proccess database query at addshp" + err
      });
    }
    if (shopPreferencesResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "shop preferences added successfully",
        shopPreferencesId: shopPreferencesResponse.insertId
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "failed to add shop preferences"
      });
    }
  });
};

//Handler to handle the api for updating a shop
let updateShopPreferences = function (req, res) {
  ///////////////////////////Validations/////////////////////////

  if (Number.isNaN(Number.parseInt(req.params.shopId))) {
    return res.status(422).json({
      response: false,
      message: "shopId is required as a number."
    });     
  }

  ////////////////Type Validations///////////////
  //Check whether shop_address is string or not
  if (typeof req.body.shop_address !== "string") {
    return res.status(422).json({
      response: false,
      message: "shop_address is required as a string"
    });
  }

  //Check whether shop_zipcode is string or not
  if (typeof req.body.shop_zipcode !== "string") {
    return res.status(422).json({
      response: false,
      message: "shop_zipcode required as a string"
    });
  }

  //Check type of lattitude
  if (typeof req.body.lattitude !== 'number') {
    return res.status(422).json({
      response: false,
      message: "lattitude must required as a number"
    });
  }

  //Check type of longitude
  if (typeof req.body.longitude !== 'number') {
    return res.status(422).json({
      response: false,
      message: "longitude must required as a number"
    });
  }

  //Validate lat longs
  if (req.body.lattitude < -90 || req.body.lattitude > 90) {
    return res.status(422).json({
      response: false,
      message: "Latitude must be between -90 and 90 degrees inclusive."
    });
  }

  if (req.body.longitude < -180 || req.body.longitude > 180) {
    return res.status(422).json({
      response: false,
      message: "Longitude must be between -180 and 180 degrees inclusive."
    });
  }

  ///After validating add shop
  model.updateShopPreferences(req.body, req.params.shopId, function (
    err,
    updateShopPreferencesResponse
  ) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "not able to proccess database query at addshp" + err
      });
    }
    if (updateShopPreferencesResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "shop preferences updated successfully"
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "shop not found with shopId: " + req.params.shopId
      });
    }
  });
};

//Handle to handle the request for adding details for a shop named as nameShop
let nameShop = function (req, res) {
  ///////////////////////////Validations/////////////////////////

  //Check whether shop_name is provided or not with valid type
  if (typeof req.body.shop_name !== 'string') {
    return res.status(422).json({
      response: false,
      message: "shop_name is required as a string."
    });
  }
  //Check whether short_description is provided or not with valid type
  if (typeof req.body.short_description !== 'string') {
    return res.status(422).json({
      response: false,
      message: "short_description is required as a string."
    });
  }

  //Check whether time_zone is provided or not with valid type
  if (typeof req.body.time_zone !== 'string') {
    return res.status(422).json({
      response: false,
      message: "time_zone is required as a string."
    });
  }

  //Validate time
  if (!helpers.isValidTime(req.body.opening_hours)) {
    return res.status(422).json({
      response: false,
      message: "Invalid opening time, it must be in format hh:mm am/pm e.g: 01:00 PM"
    });
  }

  if (!helpers.isValidTime(req.body.closing_hours)) {
    return res.status(422).json({
      response: false,
      message: "Invalid closing time, it must be in format hh:mm am/pm e.g: 01:00 PM"
    });
  }

  //Validate if working days to is invalid
  if (!helpers.isValidDay(req.body.working_days_to)) {
    return res.status(422).json({
      response: false,
      message: "Working day to is not valid"
    });
  }

  //Validate if working days from is invalid
  if (!helpers.isValidDay(req.body.working_days_from)) {
    return res.status(422).json({
      response: false,
      message: "Working day from is not valid"
    });
  }

  model.shopNameExists(req.body.shop_name, function (err, shopNameExistsResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at shopNameExists" + err
      });
    }
    if (shopNameExistsResponse.length) {
      return res.status(422).json({
        response: false,
        message: `Shop name is already in use, please select another name.`
      });
    } else {
      model.nameShop(req.body, req.params.shopId, function (err, nameShopResponse) {
        if (err) {
          return res.status(422).json({
            response: false,
            message: "not able to proccess query at nameShop" + err
          });
        }
        if (nameShopResponse.affectedRows) {
          return res.status(200).json({
            response: true,
            message: "Shop details added successfully",
          });
        } else {
          return res.status(422).json({
            response: false,
            message: "shop not found with shopId: " + req.params.shopId,
          });
        }
      });
    }
  });
}

//Handler to handle update shop status
let updateShopStatus = function (req, res) {
  ///////////////////////////Validations/////////////////////////
  //Check if status is valid
  if (req.body.shopStatus === "active" || req.body.shopStatus === "inactive") {

    model.shopExists(req.params.shopId, function (err, shopExistsResponse) {
      if (err) {
        return res.status(500).json({
          response: false,
          message: "not able to proccess query at shopExists" + err
        });
      }
      if (shopExistsResponse.length) {
        model.updateShopStatus(req.body.shopStatus, req.params.shopId, function (err, updateShopStatus) {
          if (err) {
            return res.status(500).json({
              response: false,
              message: "not able to proccess query at updateShopStatus" + err
            });
          }
          if (updateShopStatus.affectedRows) {
            return res.status(200).json({
              response: true,
              message: "Shop status updated successfully"
            });
          } else {
            return res.status(422).json({
              response: false,
              message: "Not able to update Shop status"
            });
          }
        });
      } else {
        return res.status(500).json({
          response: false,
          message: "shop not found with id: " + req.params.shopId
        });
      }
    });
  } else {
    return res.status(422).json({
      response: false,
      message: "shop status is invalid, status must be 'active' or 'inactive' "
    });
  }
}

//Handle to handle the route to add a payment method
let addPaymentMethod = function (req, res) {

  /////////////////Validations////////////////

  ////////Type Validations////////////////

  //Check if Payment method is a string
  if (typeof req.body.payment_method_name !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Payment method is required as a string."
    });
  }
  ////After validating everything add payment method in database
  model.shopExists(req.params.shopId, function (err, shopExistsResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at shopExists " + err
      });
    }
    if (shopExistsResponse.length) {
      model.addPaymentMethod(req.body.payment_method_name, req.params.shopId, function (err, paymentMethodResponse) {
        if (paymentMethodResponse.affectedRows) {
          return res.status(200).json({
            response: true,
            message: "Payment Method added successfully. ",
            paymentMethodId: paymentMethodResponse.insertId
          });
        } else {
          return res.status(500).json({
            response: false,
            message: "Not able to add payment method."
          });
        }
      });
    } else {
      return res.status(422).json({
        response: false,
        message: "Shop not found with shopId:  " + req.params.shopId
      });
    }
  });
}

//handler to handle the route to get all payment methods of a shop
let getPaymentMethods = function (req, res) {

  const { shopId } = req.params;

  model.getPaymentMethods(shopId, function (err, paymentMethodResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at getPaymentMethods" + err
      });
    }
    if (paymentMethodResponse.length) {
      return res.status(200).json({
        response: true,
        message: "found payment method(s) for shopId: " + shopId,
        paymentMethods: paymentMethodResponse
      });
    } else {
      return res.status(422).json({
        response: false,
        message: "no payment method found related to shopId: " + shopId
      });
    }
  });
}
//Function to remove a payment method
let removePaymentMethod = function (req, res) {

  const { paymentMethodId } = req.params;

  model.removePaymentMethod(paymentMethodId, function (err, removePaymentMethodResponse) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at removePaymentMethod"
      });
    }
    if (removePaymentMethodResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "Payment method removed with Id: " + paymentMethodId
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "no payment method found for id: " + paymentMethodId
      });
    }
  });
}

//Handler to handle the route to add shipping details for a shop
let addShippingDetails = function (req, res) {
  ////////////Validations////////////////

  //////////Type Validations///////////
  //Check if Proccess time is provided with valid type
  if (typeof req.body.proccess_time !== 'number') {
    return res.status(422).json({
      response: false,
      message: "Proccess time is required representing number of days."
    });
  }

  //Check if Shipping cost is provided with valid type
  if (typeof req.body.shipping_cost !== 'number') {
    return res.status(422).json({
      response: false,
      message: "Shipping cost is required as a number."
    });
  }

  //Check if Shipping Origin is provided with valid type
  if (typeof req.body.shipping_origin !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Shipping Origin is required as string."
    });
  }

  //Check if Free Shipping is provided with valid type
  if (typeof req.body.shipping_type !== 'string') {
    return res.status(422).json({
      response: false,
      message: "Shipping is required as string."
    });
  }
  //Check if Free Shipping is provided with valid type
  if (typeof req.body.free_shippment !== 'boolean') {
    return res.status(422).json({
      response: false,
      message: "Free Shipping is required with a vale of true or false."
    });
  }

  //////////After Validating everything//////////
  model.addShippingDetails(req.body, req.params.shopId, function (err, addShippingDetailsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "not able to proccess database query at addShippingDetails" + err
      });
    }
    if (addShippingDetailsResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "Shipping details added succesfully"
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "Shop not found with shopId: " + req.params.shopId
      });
    }
  });

}

//Function to add additional cost against the weight
let addAdditionalCost = function (req, res) {
  ////////////Validations////////////////

  //Check if weight is provided with valid type
  if (typeof req.body.weight !== 'number') {
    return res.status(422).json({
      response: false,
      message: "weight is required as a number."
    });
  }
  //Check if additional_cost is provided with valid type
  if (typeof req.body.additional_cost !== 'number') {
    return res.status(422).json({
      response: false,
      message: "additional_cost is required as a number."
    });
  }

  model.shopExistsAgainstShopId(req.params.shopId, function (err, shopExistsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to process query at addAdditionalCost." + err
      });
    }
    if (shopExistsResponse.length) {
      model.addAdditionalCost(req.body, req.params.shopId, function (err, additionalCostResponse) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "Not able to process query at addAdditionalCost." + err
          });
        }
        if (additionalCostResponse.affectedRows) {
          return res.status(200).json({
            response: true,
            message: "additional_cost added successfully.",
            additionalCostId: additionalCostResponse.insertId
          });
        } else {
          return res.status(422).json({
            response: false,
            message: "not able to add additional cost."
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "Shop not found with Id: " + req.params.shopId
      });
    }
  });
}

//Handler to handle the route shopNameAvailable
let shopNameAvailable = function (req, res) {
  const { shopName } = req.query;
  
  if (typeof shopName !== 'string') {
    return res.status(422).json({
      response: false,
      message: "shopName is required as a string."
    });
  }

  model.shopNameExists(shopName, function (err, shop) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "not able to execute at shopNameAvailable"
      });
    }
    if (shop.length) {
      return res.status(200).json({
        response: true,
        message: "shop name already in use."
      });
    } else {
      return res.status(200).json({
        response: true,
        message: "shop name available."
      });
    }
  });
}

let addFavouriteShop = function (req, res) {
  
}

module.exports = {
  shopPreferences,
  updateShopStatus,
  updateShopPreferences,
  nameShop,
  addPaymentMethod,
  getPaymentMethods,
  removePaymentMethod,
  addShippingDetails,
  addAdditionalCost,
  shopNameAvailable,
  addFavouriteShop
};
