const db = require("../../../config/db.config");
const helpers = require("../../../helpers/helpers");

//Function to add product and it's details;
let addProduct = function (product, callback) {
  let currentDate = helpers.getCurrentDate();
  return db.query(
    `INSERT INTO tbl_products(product_title, product_code, product_description,
        fk_tbl_product_cetegory_id, product_price, date_created, date_modified, product_status, product_stock, fk_tbl_reseller_shop_id,
        width, depth, height, product_sold) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      product.product_title,
      product.product_code,
      product.product_description,
      product.fk_tbl_product_cetegory_id,
      product.product_price,
      currentDate,
      currentDate,
      1,
      product.product_stock,
      product.fk_tbl_reseller_shop_id,
      product.width,
      product.depth,
      product.height,
      0
    ],
    callback
  );
};

//Function to save image names in database
let addImage = function (imageName, productId, is_default, callback) {
  db.query(`INSERT INTO tbl_product_images(fk_tbl_product_id, image, is_default) 
  VALUES(?,?,?)`, [productId, imageName, is_default], callback);
}

//Function to update the product
let updateProduct = function (product, productId, callback) {
  let currentDate = helpers.getCurrentDate();
  return db.query(
    `UPDATE tbl_products SET product_title = ?, product_code = ?, 
    product_description = ?, fk_tbl_product_cetegory_id = ?, 
    fk_tbl_reseller_shipment_mode = ?, product_price = ?, product_stock = ?, 
    width = ?, depth = ?, height = ?, date_modified = ? WHERE product_id = ?`,
    [
      product.product_title,
      product.product_code,
      product.product_description,
      product.fk_tbl_product_cetegory_id,
      product.fk_tbl_reseller_shipment_mode,
      product.product_price,
      product.product_stock,
      product.width,
      product.depth,
      product.height,
      currentDate,
      productId
    ],
    callback
  );
};

//Function to get images names of a particular product
let getImagesName = function (productId, callback) {
  return db.query(`SELECT image AS imageName FROM tbl_product_images WHERE fk_tbl_product_id = ?`, [productId], callback);
}

//Function to remove images names of a particular product
let removeImagesName = function (productId, callback) {
  return db.query(`DELETE FROM tbl_product_images WHERE fk_tbl_product_id = ?`, [productId], callback);
}

//Function to update product status
let updateProductStatus = function (status, productId, callback) {
  let productStatus;
  if (status === "active") {
    productStatus = 1;
  } else if (status === "inactive") {
    productStatus = 0;
  }
  return db.query(
    `UPDATE tbl_products SET product_status = ? WHERE product_id = ?`,
    [productStatus, productId],
    callback
  );
};

//Function to check whether the product with provided id exists or not
let productExists = function (productId, callback) {
  return db.query(
    `SELECT product_title FROM tbl_products WHERE  product_id = ?`,
    [productId],
    callback
  );
};

//Function to check whether the product category exists or not
let productCategoryExists = function (productCategoryId, callback) {
  return db.query(
    `SELECT * FROM tbl_product_category WHERE  category_id = ?`,
    [productCategoryId],
    callback
  );
};

//Function to check whether the reseller shop exists or not exists or not
let resellerShopExists = function (resellerShopId, callback) {
  return db.query(
    `SELECT * FROM tbl_reseller_shop WHERE  reseller_shop_id = ?`,
    [resellerShopId],
    callback
  );
};

//Function to check whether the shipment mode exists or not
let resellerShipmentModeExists = function (resellerShipmentModeId, callback) {
  return db.query(
    `SELECT * FROM reseller_shipment_mode WHERE  id = ?`,
    [resellerShipmentModeId],
    callback
  );
};

/*

///////////////////A NOTE:////////////////////
Category Attribute and Attribute Options are same as Variations in the front end
different terms are used to represent same thing at database and front end

*/

//Function to check if category attribute exists
let categoryAttributeExists = function (categoryAttributeId, callback) {
  return db.query(`SELECT * FROM tbl_category_attributes WHERE attributes_id = ?`,
    [categoryAttributeId], callback);
}

//Function to check if the options exists and are valid for category attribute
let attributeOptionsExists = function (attributeOptionId, categoryAttributeId, callback) {
  console.log(attributeOptionId, categoryAttributeId);
  return db.query(`SELECT * FROM tbl_category_attribute_options WHERE 
  fk_tbl_category_attribute_id = ? AND options_id = ?`, [categoryAttributeId,
      attributeOptionId], callback);
}

//Function to add variation options for a product
let addProductProperty = function (propertyOptions, productId, callback) {
  return db.query(`INSERT INTO tbl_product_property(fk_tbl_product_id,
    fk_tbl_category_attribute_option_ids, fk_tbl_category_attribute_id,
    visible_on_product) VALUES(?,?,?,?)`, [productId,
      propertyOptions.fk_tbl_category_attribute_option_ids, propertyOptions.fk_tbl_category_attribute_id,
      propertyOptions.visible_on_product], callback);
}

//Function to check if option already added against category id
let checkAddedAttributeOptions = function (optionId, categoryAttributeId, productId, callback) {
  return db.query(`SELECT * FROM tbl_product_property WHERE fk_tbl_category_attribute_id = ? AND 
  fk_tbl_category_attribute_option_ids = ? AND fk_tbl_product_id= ?`, [categoryAttributeId,
      optionId, productId], callback);
}

//Function to add variations
let addVariations = function (variation, callback) {
  return db.query(`INSERT INTO tbl_category_attributes(property_name,
    fk_tbl_product_category_id) VALUES(?,?)`, [variation.variation_type,
    variation.fk_tbl_product_category_id], callback);
}

//Function to addVariationOptions cost against a shopId
let addVariationOptions = function (varationOption, variationTypeId, callback) {
  return db.query(`INSERT INTO tbl_category_attribute_options(fk_tbl_category_attribute_id, 
    option_value) VALUES(?,?)`, [variationTypeId, varationOption], callback);
}

//Function to add a favourite product of a user.
let addFavouriteProduct = function (productId, userId, callback) {
  let currentDate = helpers.getCurrentDate();
  return db.query(`INSERT INTO tbl_users_fav_products(fk_tbl_products_product_id, 
    fk_tbl_users_users_id, date_created) VALUES(?,?,?)`, [productId, userId, currentDate], callback);
}

module.exports = {
  addProduct,
  addImage,
  updateProduct,
  updateProductStatus,
  getImagesName,
  removeImagesName,
  productExists,
  productCategoryExists,
  resellerShopExists,
  resellerShipmentModeExists,
  categoryAttributeExists,
  attributeOptionsExists,
  addProductProperty,
  checkAddedAttributeOptions,
  addVariations,
  addVariationOptions,
  addFavouriteProduct,
};
