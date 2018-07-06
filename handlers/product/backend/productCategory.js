const model = require("../../../models/product/backend/productCategory");
const helpers = require("../../../helpers/helpers");

//Handler to handle product category
let addProductCategory = function (req, res) {
  ///////////////Validations///////////////////
  ////////////Type Validations/////////////////
  //Check if slug has valid type
  if (typeof req.body.slug !== "number" && req.body.slug !== undefined) {
    return res.status(422).json({
      response: false,
      message: "slug must be a number"
    });
  }

  //Check if parent_category_id has valid type
  if (typeof req.body.parent_category_id !== "number" && req.body.parent_category_id !== undefined) {
    return res.status(422).json({
      response: false,
      message: "parent_category_id must be a number"
    });
  }

  //Check if category_title has valid type
  if (typeof req.body.category_title !== "string") {
    return res.status(422).json({
      response: false,
      message: "category_title is required as a string"
    });
  }

  //Check if catgory_description has valid type
  if (typeof req.body.catgory_description !== "string") {
    return res.status(422).json({
      response: false,
      message: "catgory_description is required as a string"
    });
  }

  if (req.body.parent_category_id === undefined) {
    if (req.body.status === "active" || req.body.status === "inactive") {
      model.addPrdocutCategory(req.body, function (
        err,
        addPrdocutCategoryResponse
      ) {
        if (err) {
          return res.status(500).json({
            response: false,
            message:
              "Not able to proccess database query at addproductcategory" + err
          });
        }
        if (addPrdocutCategoryResponse.affectedRows) {
          return res.status(200).json({
            response: true,
            message: "Product category added successfully",
            productCategoryId: addPrdocutCategoryResponse.insertId
          });
        } else {
          return res.status(500).json({
            response: false,
            message: "failed to add Product category"
          });
        }

      });
    } else {
      return res.status(422).json({
        response: false,
        message: "status is invalid, should be 'active' or 'inactive'"
      });
    }
  } else {
    if (req.body.status === "active" || req.body.status === "inactive") {
      model.checkParenetCategory(req.body.parent_category_id, function (err, categoryExists) {
        if (err) {
          return res.status(500).json({
            response: false,
            message: "Not able to proccess database query at checkParenetCategory" + err
          });
        }
        if (categoryExists.length) {
          model.addPrdocutCategory(req.body, function (
            err,
            addPrdocutCategoryResponse
          ) {
            if (err) {
              return res.status(500).json({
                response: false,
                message:
                  "Not able to proccess database query at addproductcategory" + err
              });
            }
            if (addPrdocutCategoryResponse.affectedRows) {
              return res.status(200).json({
                response: true,
                message: "Product category added successfully",
                productCategoryId: addPrdocutCategoryResponse.insertId
              });
            } else {
              return res.status(500).json({
                response: false,
                message: "failed to add Product category"
              });
            }
          });
        } else {
          return res.status(500).json({
            response: false,
            message: "Parent category with id " + req.body.parent_category_id + " does not exists."
          });
        }
      });
    } else {
      return res.status(422).json({
        response: false,
        message: "status is invalid, should be 'active' or 'inactive'"
      });
    }
  }
};

module.exports = {
  addProductCategory
};
