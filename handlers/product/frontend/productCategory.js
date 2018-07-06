const model = require("../../../models/product/backend/productCategory");
const helpers = require("../../../helpers/helpers");

//Handler to get the product categories
let getCategories = function (req, res) {
    if (req.query.parent) {
        model.getCategories(req.query.parent, function (err, response) {
            if (err) {
                return res.status(500).json({
                    response: false,
                    message:
                        "Not able to proccess database query at getCategories" + err
                });
            }
            if (response.length) {
                return res.status(200).json({
                    response: true,
                    message: "Child categories: ",
                    categoriesCount: response.length,
                    categories: response
                });
            } else {
                return res.status(404).json({
                    response: false,
                    message: "No category found."
                });
            }
        });
    } else {
        model.getCategories(false, function (err, response) {
            if (err) {
                return res.status(500).json({
                    response: false,
                    message:
                        "Not able to proccess database query at getCategories" + err
                });
            }
            if (response.length) {
                return res.status(200).json({
                    response: true,
                    message: "Parent Categories: ",
                    categoriesCount: response.length,
                    categories: response
                });
            } else {
                return res.status(404).json({
                    response: false,
                    message: "No category found."
                });
            }
            res.send(response);
        });
    }
}

module.exports = {
    getCategories
};

