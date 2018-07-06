const validator = require("validator");

const helpers = require("../../../helpers/helpers");
const model = require("../../../models/user/backend/userShippingAddress");

//Handler to handle the api endpoint for adding a shipping address against a vendor
let addShippingAddress = function (req, res) {
  ///////////////////////Validations//////////////////

  ////////////Type Validations And Required Fields/////////////

  //whether first_name type is valid or not
  if (typeof req.body.first_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "first_name is required as string"
    });
  }

  //whether last_name type is valid or not
  if (typeof req.body.last_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "last_name is required as string"
    });
  }

  //whether phone type is valid or not
  if (typeof req.body.phone !== "string") {
    return res.status(422).json({
      response: false,
      message: "phone is required as string"
    });
  }

  //whether user_address type is valid or not
  if (typeof req.body.user_address !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_address is required as string"
    });
  }

  //whether user_country type is valid or not
  if (typeof req.body.user_country !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_country is required as string"
    });
  }

  //whether user_city type is valid or not
  if (typeof req.body.user_city !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_city is required as string"
    });
  }

  //whether user_zipcode type is valid or not
  if (typeof req.body.user_zipcode !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_zipcode is required as string"
    });
  }
  //whether user_state type is valid or not
  if (typeof req.body.user_state !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_state is required as string"
    });
  }
  //whether company_name type is valid or not
  if (typeof req.body.company_name !== "string" && req.body.company_name !== undefined) {
    return res.status(422).json({
      response: false,
      message: "company_name must be a string"
    });
  }

  //whether user_address2 type is valid or not
  if (typeof req.body.user_address2 !== "string" && req.body.user_address2 !== undefined) {
    return res.status(422).json({
      response: false,
      message: "user_address2 must be a string"
    });
  }

  //After validating input, add shipping address
  model.addShippingAddress(req.body, req.params.userId, function (
    err,
    addShippingAddressResponse
  ) {
    if (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2" ||
        err.code === "ER_NO_REFERENCED_ROW"
      ) {
        return res.status(422).json({
          response: false,
          message: "User not found with id: " + req.params.userId
        });
      }
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at addingshippingAddress" + err
      });
    }
    if (addShippingAddressResponse.insertId) {
      return res.status(200).json({
        response: true,
        message: "Shipping Address added successfully",
        addressId: addShippingAddressResponse.insertId
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "Not able to add shipping address"
      });
    }
  });
};

//Handler to hanlde the api endpoint to get array of the addresses of a particular user
let getShippingAddresses = function (req, res) {
  model.getShippingAddresses(req.params.userId, function (
    err,
    shippingAddressesResponse
  ) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at getShippingAddresses"
      });
    }
    if (shippingAddressesResponse.length) {
      return res.status(200).json({
        response: true,
        message: "Addresses: ",
        shippingAddressesCount: shippingAddressesResponse.length,
        shippingAddresses: shippingAddressesResponse
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "no address found for the userId: " + req.params.userId
      });
    }
  });
};

//Handler to handle the api endpoint to update a particular address
let updateShippingAddress = function (req, res) {
  ///////////////////////Validations//////////////////
  ////////////Type Validations And Required Fields/////////////

  //whether first_name type is valid or not
  if (typeof req.body.first_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "first_name is required as string"
    });
  }

  //whether last_name type is valid or not
  if (typeof req.body.last_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "last_name is required as string"
    });
  }

  //whether phone type is valid or not
  if (typeof req.body.phone !== "string") {
    return res.status(422).json({
      response: false,
      message: "phone is required as string"
    });
  }

  //whether user_address type is valid or not
  if (typeof req.body.user_address !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_address is required as string"
    });
  }

  //whether user_country type is valid or not
  if (typeof req.body.user_country !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_country is required as string"
    });
  }

  //whether user_city type is valid or not
  if (typeof req.body.user_city !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_city is required as string"
    });
  }

  //whether user_zipcode type is valid or not
  if (typeof req.body.user_zipcode !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_zipcode is required as string"
    });
  }
  //whether user_state type is valid or not
  if (typeof req.body.user_state !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_state is required as string"
    });
  }
  //whether company_name type is valid or not
  if (typeof req.body.company_name !== "string") {
    return res.status(422).json({
      response: false,
      message: "company_name must be a string"
    });
  }

  //whether user_address2 type is valid or not
  if (typeof req.body.user_address2 !== "string") {
    return res.status(422).json({
      response: false,
      message: "user_address2 must be a string"
    });
  }
  //After validating input, update shipping address
  model.updateShippingAddress(req.body, req.params.addressId, function (
    err,
    updateShippingAddressResponse
  ) {
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at updateShippingAddress"
      });
    }
    if (updateShippingAddressResponse.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "Shipping address updated successfully"
      });
    } else {
      return res.status(500).json({
        response: false,
        message: "No address found with addressId: " + req.params.addressId
      });
    }
  });

};

//Handler to handle the route removing the shippingaddress
let removeShippingAddress = function (req, res) {
  model.removeShippingAddress(req.params.addressId, function (err, removeShippingAddressResponse) {
    //Check whether any error occured during query execution
    if (err) {
      return res.status(422).json({
        response: false,
        message: "not able to proccess query at removeShippingAddress" + err
      });
    }
    if (removeShippingAddressResponse) {
      return res.status(200).json({
        response: true,
        message: "Address removed with Id: " + req.params.addressId
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "Address not found with Id: " + req.params.addressId
      });
    }
  });
};

module.exports = {
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  removeShippingAddress,
};
