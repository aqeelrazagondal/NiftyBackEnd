const path = require("path");
const fs = require("fs");

const model = require("../../../models/product/backend/product");
const helpers = require("../../../helpers/helpers");
////////////Global Counter variable to know if any of the option is are invalid

//Handler for add product
let addProduct = function (req, res) {
  ////////////Validations/////////////////
  /////////Required Fields Validations///////////

  //Check if image is provided
  if (!req.files.length) {
    return res.status(422).json({
      response: false,
      message: "Please provide the image(s)."
    });
  }

  ////////////////Type Validations//////////////////

  //Check whether the product_title is a strig or not
  if (typeof req.body.product_title !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_title is required as string"
    });
  }

  //Check whether the product_code is a number or not
  if (typeof Number.parseInt(req.body.product_code) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_code))) {
    return res.status(422).json({
      response: false,
      message: "product_code is required as number"
    });
  }

  //Check whether the product_description is a strig or not
  if (typeof req.body.product_description !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_description is required as string"
    });
  }

  //Check whether the fk_tbl_product_cetegory_id is a number or not
  if (typeof Number.parseInt(req.body.fk_tbl_product_cetegory_id) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.fk_tbl_product_cetegory_id))) {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_product_cetegory_id is required as number"
    });
  }

  //Check whether the product_price is a number or not
  if (typeof Number.parseInt(req.body.product_price) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_price))) {
    return res.status(422).json({
      response: false,
      message: "product_price is required as number."
    });
  }

  //Check whether the product_stock is a number or not
  if (typeof Number.parseInt(req.body.product_stock) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_stock))) {
    return res.status(422).json({
      response: false,
      message: "product_stock is required as number"
    });
  }

  //Check whether the fk_tbl_reseller_shop_id is a number or not
  if (typeof Number.parseInt(req.body.fk_tbl_reseller_shop_id) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.fk_tbl_reseller_shop_id))) {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_reseller_shop_id is required as number"
    });
  }

  //Check whether the width is a number or not
  if (typeof Number.parseInt(req.body.width) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.width))) {
    return res.status(422).json({
      response: false,
      message: "width is required as number"
    });
  }

  //Check whether the depth is a number or not
  if (typeof Number.parseInt(req.body.depth) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.depth))) {
    return res.status(422).json({
      response: false,
      message: "depth is required as number"
    });
  }

  //Check whether the depth is a number or not
  if (typeof Number.parseInt(req.body.depth) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.depth))) {
    return res.status(422).json({
      response: false,
      message: "depth is required as number"
    });
  }

  //Check whether the height is a number or not
  if (typeof Number.parseInt(req.body.height) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.height))) {
    return res.status(422).json({
      response: false,
      message: "height is required as number"
    });
  }

  //Check whether the category exists or not
  model.productCategoryExists(req.body.fk_tbl_product_cetegory_id, function (
    err,
    categoryExistsResponse
  ) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to proccess database query at productCategoryExists" + err
      });
    }
    //If category exists
    if (categoryExistsResponse.length) {
      //Check whether the reseller shop exits or not
      model.resellerShopExists(req.body.fk_tbl_reseller_shop_id, function (
        err,
        shopExistsResponse
      ) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "Not able to proccess database query at resellerShopExists" + err
          });
        }
        // If the shop exists
        if (shopExistsResponse.length) {
          model.addProduct(req.body, function (
            err,
            addProductResponse
          ) {
            if (err) {
              return res.status(500).json({
                response: false,
                message:
                  "Not able to process query at add product" + err
              });
            }
            if (addProductResponse.insertId) {
              for (let i = 0; i <= req.files.length - 1; i++) {
                ((filename, productId) => {
                  model.addImage(filename, productId, 0 ,function (err, response) {
                    if (err) {
                      if (i === req.files.length - 1) {
                        return res.status(500).json({
                          response: false,
                          message: "failed to run query at addImage" + err
                        });
                      }
                    }
                    if (i === req.files.length - 1) {
                      if (response.affectedRows) {
                        return res.status(200).json({
                          response: true,
                          message: "Product added successfully",
                          productId: addProductResponse.insertId
                        });
                      }
                    }
                  });
                })(req.files[i].filename, addProductResponse.insertId);
              }
            }
          });
        } else {
          return res.status(404).json({
            response: false,
            message: "Reseller shop does not exists"
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "Product category does not exists"
      });
    }
  });

};

//Handler for update product
let updateProduct = function (req, res) {
  let requestImages;
  ////////////Validations/////////////////
  /////////Required Fields Validations///////////

  if (!req.files.length) {
    return res.status(422).json({
      response: false,
      message: "please provide image(s)"
    });
  }

  //Assign images to a variable
  requestImages = req.files;

  ////////////////Type Validations//////////////////
  //Check whether the product_title is a strig or not
  if (typeof req.body.product_title !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_title is required as string"
    });
  }

  //Check whether the product_code is a number or not
  if (typeof Number.parseInt(req.body.product_code) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_code))) {
    return res.status(422).json({
      response: false,
      message: "product_code is required as number"
    });
  }

  //Check whether the product_description is a strig or not
  if (typeof req.body.product_description !== "string") {
    return res.status(422).json({
      response: false,
      message: "product_description is required as string"
    });
  }

  //Check whether the fk_tbl_product_cetegory_id is a number or not
  if (typeof Number.parseInt(req.body.fk_tbl_product_cetegory_id) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.fk_tbl_product_cetegory_id))) {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_product_cetegory_id is required as number"
    });
  }

  //Check whether the product_price is a number or not
  if (typeof Number.parseInt(req.body.product_price) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_price))) {
    return res.status(422).json({
      response: false,
      message: "product_price is required as number"
    });
  }

  //Check whether the product_stock is a number or not
  if (typeof Number.parseInt(req.body.product_stock) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.product_stock))) {
    return res.status(422).json({
      response: false,
      message: "product_stock is required as number"
    });
  }

  //Check whether the width is a number or not
  if (typeof Number.parseInt(req.body.width) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.width))) {
    return res.status(422).json({
      response: false,
      message: "width is required as number"
    });
  }

  //Check whether the depth is a number or not
  if (typeof Number.parseInt(req.body.depth) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.depth))) {
    return res.status(422).json({
      response: false,
      message: "depth is required as number"
    });
  }

  //Check whether the depth is a number or not
  if (typeof Number.parseInt(req.body.depth) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.depth))) {
    return res.status(422).json({
      response: false,
      message: "depth is required as number"
    });
  }

  //Check whether the height is a number or not
  if (typeof Number.parseInt(req.body.height) !== "number" ||
    Number.isNaN(Number.parseInt(req.body.height))) {
    return res.status(422).json({
      response: false,
      message: "height is required as number"
    });
  }

  //Check whether the product exists or not
  model.productExists(req.params.productId, function (
    err,
    productExistsResponse
  ) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to process the query at product exists " + err
      });
    }
    //If it exists
    if (productExistsResponse.length) {
      //check whether the product category exists or not
      model.productCategoryExists(req.body.fk_tbl_product_cetegory_id, function (
        err,
        categoryResponse
      ) {
        if (err) {
          return console.log(
            "Not able to proccess database query at category exists"
          );
        }
        //If product category exists
        if (categoryResponse.length) {
          model.updateProduct(req.body, req.params.productId, function (
            err,
            updateProductResponse
          ) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: "Not able to process the query at update product" + err
              });
            }
            //if it product is updated
            if (updateProductResponse.affectedRows) {
              model.getImagesName(req.params.productId, function (err, images) {
                if (err) {
                  return res.status(500).json({
                    response: false,
                    message: "Not able to process the query at getImagesName" + err
                  });
                }
                if (images.length) {
                  images.forEach((image, index) => {
                    const imagePath = path.join(rootPath,
                      `/public/images/${image.imageName}`);
                    fs.unlink(imagePath, function (err, success) {
                      if (err) {
                        return res.status(500).json({
                          response: false,
                          message: "Failed to remove image from server"
                        });
                      } else {
                        if (index === images.length - 1) {
                          model.removeImagesName(req.params.productId, function (err, removeImages) {
                            if (err) {
                              return res.status(500).json({
                                response: false,
                                message: "Not able to process the query at removeImagesName" + err
                              });
                            }
                            if (removeImages.affectedRows) {
                              requestImages.forEach((image, index) => {
                                ((image, index, length) => {
                                  model.addImage(image.filename, req.params.productId, function (err, addImageResponse) {
                                    if (err) {
                                      return res.status(500).json({
                                        response: false,
                                        message: "Not able to process the query at addImage" + err
                                      });
                                    }
                                    if (index === length - 1) {
                                      if (addImageResponse.affectedRows) {
                                        return res.status(200).json({
                                          response: true,
                                          message: "Product updated successfully"
                                        });
                                      } else {
                                        return res.status(500).json({
                                          response: false,
                                          message: "Something went wrong at add image"
                                        });

                                      }
                                    }
                                  });
                                })(image, index, requestImages.length);
                              });
                            } else {
                              return res.status(500).json({
                                response: false,
                                message: "Something went wrong"
                              });
                            }
                          });
                        } else {
                          console.log('Not last iteration');
                        }
                      }
                    });
                  });
                } else {
                  requestImages.forEach((image, index) => {
                    ((image, index, length) => {
                      model.addImage(image.filename, req.params.productId, function (err, addImageResponse) {
                        if (err) {
                          return res.status(500).json({
                            response: false,
                            message: "Not able to process the query at addImage" + err
                          });
                        }
                        if (index === length - 1) {
                          if (addImageResponse.affectedRows) {
                            return res.status(200).json({
                              response: true,
                              message: "Product updated successfully"
                            });
                          } else {
                            return res.status(500).json({
                              response: false,
                              message: "Something went wrong at add image"
                            });

                          }
                        }
                      });
                    })(image, index, requestImages.length);
                  });
                }
              });
            } else {
              return res.status(500).json({
                response: false,
                message: "Product not updated!!!"
              });
            }
          });
        } else {
          return res.status(404).json({
            response: false,
            message: "Product category does not exist"
          });
        }
      });
    } else {
      return res.status(200).json({
        response: false,
        message: "Product not found with id: " + req.params.productId
      });
    }
  });
};

//Handler for updating product status
let updateProductStatus = function (req, res) {
  if (req.body.status === "active" || req.body.status === "inactive") {
    model.productExists(req.params.productId, function (
      err,
      productExistsResponse
    ) {
      if (err) {
        return res.status(500).json({
          response: false,
          message: "Not able to process database query at product exists"
        });
      }
      if (productExistsResponse.length) {
        model.updateProductStatus(
          req.body.status,
          req.params.productId,
          function (err, updateProductStatusResponse) {
            if (err) {
              return res.status(500).json({
                response: false,
                message: "Not able to process the query at update product" + err
              });
            }
            if (updateProductStatusResponse.affectedRows) {
              return res.status(200).json({
                response: true,
                message: "Product status updated successfully"
              });
            }
            return res.status(200).json({
              response: false,
              message: "Failed to update product."
            });
          }
        );
      } else {
        return res.status(200).json({
          response: false,
          message: "Product not found with id: " + req.params.productId
        });
      }
    });
  } else {
    return res.status(200).json({
      response: false,
      message: "Invalid status, status should be active or inactive"
    });
  }
};

//Handler to handle the route to product propert or variation
let addProductProperty = function (req, res) {
  ///All of the options provided in the request
  let optionIds = req.body.optionIds;
  //This is a counter to track if there is any option being provided that doesn't exists in the database
  var countInValidOption = 0;
  //This is a counter to track if there is any option being provided already added for a particular order
  var countAlreadyAddedOptions = 0;
  //Add all options that were already added in the database
  var alreadyAddedOption = [];

  //Check whether the fk_tbl_category_attribute_option_ids is provided as an array or not
  if (optionIds === undefined || optionIds.length === 0 
    || optionIds.length === undefined) {
    return res.status(422).json({
      response: false,
      message: "optionIds must be an array of attribute (variation) options ids"
    });
  }

  //Check whether the fk_tbl_category_attribute_id is provided or not
  if (typeof req.body.fk_tbl_category_attribute_id !== 'number') {
    return res.status(422).json({
      response: false,
      message: "fk_tbl_category_attribute_id is required as a number."
    });
  }

  //Check whether the visible_on_product is provided or not
  if (typeof req.body.visible_on_product !== 'boolean') {
    return res.status(422).json({
      response: false,
      message: "visible_on_product is required with the value true or false."
    });
  }

  for (let i = 0; i < optionIds.length; i++) {
    if (typeof optionIds[i] !== 'number') {
      return res.status(422).json({
        response: false,
        message: "fk_tbl_category_attribute_option_ids is required as a number."
      });
    }
  }

  //Check if product exists with provided Id
  model.productExists(req.params.productId, function (err, productExistsResponse) {
    if (err) {
      return res.status(500).json({
        response: false,
        message: "Not able to process query at productExists" + err
      });
    }
    //If product exists then
    if (productExistsResponse.length) {
      //Check if the category provided is in the database or not
      model.categoryAttributeExists(req.body.fk_tbl_category_attribute_id, function (err, attributeExistsResponse) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "Not able to process query at categoryAttributeExists " + err
          });
        }
        //If category is in our system then
        if (attributeExistsResponse.length) {
          //loop through all hte option id provided, check if it exists in our database against attribute id
          for (let i = 0; i < optionIds.length; i++) {
            ((optionId, categoryId, i, length) => {
              model.attributeOptionsExists(optionId, categoryId, function (err, optionExists) {
                if (err) {
                  return res.status(500).json({
                    response: false,
                    message: "Not able to process query at attributeOptionsExists " + err
                  });
                }
                //If it doesnot exists, count it
                if (optionExists.length === 0) {
                  countInValidOption++;
                }
                //Check if it is last iteration
                if (i === length - 1) {
                  //If the counter value is zero, that means there is no invalid option
                  if (!countInValidOption) {
                    //again loop through the option ids along with product id and category id to
                    //check if the option has already been added against a product in same category
                    for (let k = 0; k < optionIds.length; k++) {
                      //check if options already added
                      ((optionId, attributeId, k, length) => {
                        model.checkAddedAttributeOptions(optionId, attributeId, req.params.productId, function (err, successReponse) {
                          if (err) {
                            return res.status(500).json({
                              response: false,
                              message: "Not able to process query at checkAddedAttributeOptions " + err
                            });
                          }
                          //if the option is already added, make increament in already added options
                          if (successReponse.length) {
                            alreadyAddedOption.push(optionIds[k]);
                            countAlreadyAddedOptions++;
                          }
                          //At last iteration
                          if (k === length - 1) {
                            //if there is no option that already been added, add product property
                            if (!countAlreadyAddedOptions) {
                              //Again loop through the option ids and add properties after validating optionids
                              for (let j = 0; j < optionIds.length; j++) {
                                ((body, productId, j, length) => {
                                  model.addProductProperty(body, productId, function (err, productPropertyReponse) {
                                    if (err) {
                                      return res.status(500).json({
                                        response: false,
                                        message: "Not able to process query at addProductProperty " + err
                                      });
                                    }
                                    if (productPropertyReponse.affectedRows) {
                                      //Only send response at last insertion record
                                      if (i === length - 1) {
                                        return res.status(200).json({
                                          response: false,
                                          message: "product property added successfully.",
                                          propertyId: productPropertyReponse.insertId
                                        });
                                      }
                                    } else {
                                      //Only send response at last insertion record
                                      if (i === length - 1) {
                                        return res.status(500).json({
                                          response: false,
                                          message: "Not able to add product property."
                                        });
                                      }

                                    }
                                  });
                                })(req.body, req.params.productId, j, optionIds.length);
                              }
                            } else {
                              return res.status(500).json({
                                response: false,
                                message: "Some of options already added: ",
                                alreadyAddedOptions: alreadyAddedOption
                              });
                            }
                          }
                        });
                      })(optionIds[k], req.body.fk_tbl_category_attribute_id, k, optionIds.length);
                    }
                  } else {
                    return res.status(500).json({
                      response: false,
                      message: "Failed to add variation, option id(s) not valid."
                    });
                  }
                }

              });
            })(optionIds[i], req.body.fk_tbl_category_attribute_id, i, optionIds.length);
          }
        } else {
          return res.status(404).json({
            response: false,
            message: "no category attribute of the id: " + req.body.fk_tbl_category_attribute_id
          });
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "no product found with id: " + req.params.productId
      });
    }
  });
}


// //////////////////////[ADMIN]////////////////////
// handler to handle the route to add variations
let addNewVariations = function (req, res, next) {
  let variations = req.body.variations;
  this.iterateLoop = true;
  var self = this;
  ///////////////////////////Validations/////////////////////////

  //Validate through the variations array
  for (let index = 0; index < variations.length; index++) {
    if (typeof variations[index]['variation_type'] !== 'string') {
      return res.status(422).json({
        response: false,
        message: "Variation type is required as a string."
      });
    }
    if (typeof variations[index]['fk_tbl_product_category_id'] !== 'number') {
      return res.status(422).json({
        response: false,
        message: "fk_tbl_product_category_id is required as number."
      });
    }
    if (variations[index]['variation_options'] === undefined) {
      return res.status(422).json({
        response: false,
        message: "Please provide variation_options."
      });
    }
    if (!variations[index]['variation_options'].length) {
      return res.status(422).json({
        response: false,
        message: "Please provide an array of variation options."
      });
    }
  }

  for (let i = 0; i <= variations.length - 1; i++) {
    if (self.iterateLoop) {
      ((variation, i, length, self) => {
        model.addVariations(variation, function (err, addVariationsResponse) {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return next({
                json: true,
                response: false,
                message: "Variation already added."
              });
            }
            return res.status(500).json({
              response: false,
              message: "Not able to process query at addVariations" + err
            });
          }
          if (addVariationsResponse.affectedRows) {
            for (let j = 0; j <= variations[i].variation_options.length - 1; j++) {
              ((variationOptions, id, i, length, j, jlength) => {
                model.addVariationOptions(variationOptions, id, function (err, success) {
                  if (err) {
                    return res.status(500).json({
                      response: false,
                      message: "Not able to process query at addVariationOptions" + err
                    });
                  }
                  if (i === length - 1 && j === jlength - 1) {
                    if (success.affectedRows) {
                      return res.status(200).json({
                        response: true,
                        message: "variation added successfully"
                      });
                    } else {
                      return res.status(500).json({
                        response: false,
                        message: "Failed to add variations options."
                      });
                    }
                  }
                });
              })(variation.variation_options[j], addVariationsResponse.insertId, i, length, j, variations[i].variation_options.length);
            }
          } else {
            return res.status(422).json({
              response: true,
              message: "not able to add variation"
            });
          }
        });
      })(req.body.variations[i], i, variations.length, self);
    } else {
      break;
    }
  }
}

//Handler to handle the route to udpate options of a variations
let addVariationOptions = function (req, res) {
  let { option_value } = req.body;
  if (typeof option_value !== 'string') {
    return res.status(422).json({
      response: true,
      message: "option value is required as a string."
    });
  }

  model.addVariationOptions(option_value, req.params.variationId, function (err, success) {
    if (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(500).json({
          response: false,
          message: "Variation type does not exists with id: " + req.params.variationId
        });
      }
      return res.status(500).json({
        response: false,
        message: "Not able to process query at addVariations" + err
      });
    }
    if (success.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "New option added successfully."
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "No variation type found with id: " + req.params.variationId
      });
    }
  });
}


//Hanlder to handle the route to add a favourite product
let addFavouriteProduct = function (req, res) {
  const {productId, userId} = req.body;
  console.log("Bopdy=======" ,req.body);
  if (typeof productId !== 'number' || typeof userId !== 'number') {
    return res.status(500).json({
      response: false,
      message: "productId and userId are required as number."
    });
  }
  model.addFavouriteProduct(productId, userId, function(err, success) {
    if (err) {
      
      if (err.code === 'ER_DUP_ENTRY') {
        return res.json({
          response: false,
          message: `The product with Id: ${productId} is already added as a favourite product of user with Id: ${userId}.`
        });        
      }
      
      // if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW') {
      //   return res.status(500).json({
      //     response: false,
      //     message: "No favourite product added, please provide valid productId and userId."
      //   });        
      // }
      // return res.status(500).json({
      //   response: false,
      //   message: "Failed to proccess query at addFavouriteProduct." + err
      // });
    }
    if (success.affectedRows) {
      return res.status(200).json({
        response: true,
        message: "Product added to favourite successfully."
      });
    }
  });
}

module.exports = {
  addProduct,
  updateProduct,
  updateProductStatus,
  addProductProperty,
  addNewVariations,
  addVariationOptions,
  addFavouriteProduct
};



