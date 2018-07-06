const model = require("../../../models/product/backend/productImage");
const helpers = require(".././../../helpers/helpers");

//Handler to hande upload image
let uploadImageDetails = function (req, res) {
  if (req.file === undefined) {
    return res.status(404).json({
      response: false,
      message: "Please provide the image"
    });
  }

  if (req.body.isDefault != 0 && req.body.isDefault != 1) {
    return res.status(404).json({
      response: false,
      message: "isDefault is required as 0 or 1."
    });
  }

  model.productExists(req.params.productId, function (
    err,
    productExistsResponse
  ) {
    if (err) {
      return res.status(500).json({
        response: false,
        message:
          "not able to process database query at productExists" +
          err
      });
    }
    if (productExistsResponse.length) {
      model.checkDefault(req.params.productId, function (err, success) {
        if (err) {
          return res.status(500).json({
            response: false,
            message:
              "not able to process database query at checkDefault" +
              err
          });
        }
        if (success.length) {
          return res.status(500).json({
            response: false,
            message: "There is already a defualt image."
          });
        } else {
          model.uploadImageDetails(
            req.body,
            req.file.filename,
            req.params.productId,
            function (err, uploadImageDetailsResponse) {
              if (err) {
                return res.status(500).json({
                  response: false,
                  message:
                    "not able to process database query at uploaduserimagedetails" +
                    err
                });
              }
              if (uploadImageDetailsResponse.affectedRows) {
                return res.status(200).json({
                  response: true,
                  message: "Image uploaded successfully"
                });
              } else {
                return res.status(500).json({
                  response: false,
                  message: "Failed to proccess request"
                });
              }
            }
          );
        }
      });
    } else {
      return res.status(404).json({
        response: false,
        message: "product does not exist with productId: " + req.params.productId
      });
    }
  });
};

module.exports = {
  uploadImageDetails
};
