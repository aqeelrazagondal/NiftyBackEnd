const path = require("path");
const fs = require("fs");

const model = require("../../../models/product/frontend/product");
const helpers = require("../../../helpers/helpers");

//Handler to handle the route to get all prodcuts of a shop
let getAllProducts = function (req, res) {
    let limit;
    //Validate limit
    if (req.query.limit !== undefined) {
        limit = Number.parseInt(req.query.limit);
        if (Number.isNaN(limit)) {
            return res.status(422).json({
                response: false,
                message: "Please provide valid limit of type number."
            });
        }
    } else {
        limit = 0;
    }
    if (Number.isNaN(limit)) {
        return res.status(422).json({
            response: false,
            message: "Please provide valid limit of type number."
        });
    }
    //After validations:
    model.getAllProducts(limit, req.params.shopId, function (err, allProducts) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Not able to proccess query at getAllProducts."
            });
        }
        if (allProducts.length) {
            for (let i = 0; i < allProducts.length; i++) {
                ((product, i, length) => {
                    model.getDefaultImage(product.product_id, function (err, productImage) {
                        if (productImage.length) {
                            product.imageName = productImage[0].imageName;
                        } else {
                            product.imageName = null;
                        }
                        if (i === length - 1) {
                            return res.status(200).json({
                                response: true,
                                message: "shop products lists for shopId: " + req.params.shopId,
                                productsCout: allProducts.length,
                                products: allProducts
                            });
                        }
                    });
                })(allProducts[i], i, allProducts.length);
            }
        } else {
            return res.status(404).json({
                response: false,
                message: "No product found with shopId: " + req.params.shopId
            });
        }
    });
}

//Handler to get the popular products
let getPopularProdcts = function (req, res) {
    let limit;
    //Validate limit
    if (req.query.limit !== undefined) {
        limit = Number.parseInt(req.query.limit);
        if (Number.isNaN(limit)) {
            return res.status(422).json({
                response: false,
                message: "Please provide valid limit of type number."
            });
        }
    } else {
        limit = 0;
    }
    if (Number.isNaN(limit)) {
        return res.status(422).json({
            response: false,
            message: "Please provide valid limit of type number."
        });
    }
    //After validations:
    model.getPopularProdcts(limit, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to proccess query at getAllProducts" + err
            });
        }
        return res.status(200).json({
            response: true,
            message: "Top products: ",
            productsCount: products.length,
            products: products
        });
    });
}



let getPopularProdctsShop = function (req, res) {
    let limit;
    //Validate limit
    if (req.query.limit !== undefined) {
        limit = Number.parseInt(req.query.limit);
        if (Number.isNaN(limit)) {
            return res.status(422).json({
                response: false,
                message: "Please provide valid limit of type number."
            });
        }
    } else {
        limit = 0;
    }
    if (Number.isNaN(limit)) {
        return res.status(422).json({
            response: false,
            message: "Please provide valid limit of type number."
        });
    }

    //After validations:
    model.getPopularProdctsShop(req.params.shopId, limit, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to proccess query at getPopularProdctsShop" + err
            });
        }
        if (products.length) {
            for (let i = 0; i < products.length; i++) {
                ((product, i, length) => {
                    model.getDefaultImage(product.product_id, function (err, productImage) {
                        if (productImage.length) {
                            product.imageName = productImage[0].imageName;
                        } else {
                            product.imageName = null;
                        }
                        if (i === length - 1) {
                            return res.status(200).json({
                                response: true,
                                message: "Top products of shop: ",
                                productsCount: products.length,
                                products: products
                            });
                        }
                    });
                })(products[i], i, products.length);
            }
        } else {
            return res.status(500).json({
                response: false,
                message: "No product found with shopId: " + req.params.shopId,
            });
        }

    });
}

//Handler to handle the route to add views
let addView = function (req, res) {
    const { productId, ip } = req.body;
    console.log("------------------------------------------------------");
    if (typeof productId !== 'number') {
        return res.status(500).json({
            response: false,
            message: "productId is required of type number."
        });
    }

    if (!helpers.isValidIp(ip)) {
        return res.status(500).json({
            response: false,
            message: "Please provide a valid IP address."
        });
    }

    model.checkView(productId, ip, function (err, views) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to proccess query at addView " + err
            });
        }
        if (views.length) {
            return res.status(500).json({
                response: false,
                message: "View already added for the provided user with given IP."
            });
        } else {
            model.addView(req.body.productId, req.body.ip, function (err, success) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message: "Failed to proccess query at addView " + err
                    });
                }
                if (success.affectedRows) {
                    return res.status(200).json({
                        response: true,
                        message: "successfully view added "
                    });
                } else {
                    return res.status(500).json({
                        response: false,
                        message: "Failed to add views."
                    });
                }
            });
        }
    });
}

//handler to handle the route to get most visited products
let getMostViewedProducts = function (req, res) {
    let limit;
    //Validate limit
    if (req.query.limit !== undefined) {
        limit = Number.parseInt(req.query.limit);
        if (Number.isNaN(limit)) {
            return res.status(422).json({
                response: false,
                message: "Please provide valid limit of type number."
            });
        }
    } else {
        limit = 0;
    }
    if (Number.isNaN(limit)) {
        return res.status(422).json({
            response: false,
            message: "Please provide valid limit of type number."
        });
    }

    //After validations:
    model.getMostViewedProducts(limit, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to execute query at " + err
            });
        }
        if (products.length) {
            return res.status(200).json({
                response: true,
                message: "Products obtained.",
                productsCount: products.length,
                products: products
            });
        } else {
            return res.status(500).json({
                response: false,
                message: "Something went wrong.",
            });
        }
    });
}

//Handler to get most viewed products of a particular shop
let getMostViewedProductsShop = function (req, res) {
    let limit;
    //Validate limit
    if (req.query.limit !== undefined) {
        limit = Number.parseInt(req.query.limit);
        if (Number.isNaN(limit)) {
            return res.status(422).json({
                response: false,
                message: "Please provide valid limit of type number."
            });
        }
    } else {
        limit = 0;
    }
    if (Number.isNaN(limit)) {
        return res.status(422).json({
            response: false,
            message: "Please provide valid limit of type number."
        });
    }
    //After validations:
    model.getMostViewedProductsShop(req.params.shopId, limit, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to execute query at getMostViewedProductsShop " + err
            });
        }
        if (products.length) {
            return res.status(200).json({
                response: true,
                message: "Products",
                productsCount: products.length,
                products: products

            });
        } else {
            return res.status(500).json({
                response: false,
                message: "no product found with shop id:  " + req.params.shopId
            });
        }
    });
}

let getCategoryProducts = function (req, res) {
    const { categoryId } = req.params;
    model.getCategoryProducts(categoryId, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to execute query at getCategoryProducts " + err
            });
        }
        if (products.length) {
            return res.status(200).json({
                response: true,
                message: "List of products.",
                productsCount: products.length,
                products
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "No product found for category with Id: " + categoryId
            });
        }
    });
} 


let recentView = function (req, res) {
    const { ip } = req.params;
    model.recentView(ip, function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to execute query at  " + err
            });
        }
        if (products.length) {
            return res.status(200).json({
                response: true,
                message: "List of Rcenet Your recent Viewed products.",
                productsCount: products.length,
                products
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "No product found for Ip : " + ip
            });
        }
    });
}

//Handler to get the product details
let getProdctDetails = function (req, res) {
   const { id } = req.params;
    model.getProdctDetails(id , function (err, products) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "Failed to execute query at getProducts " + err
            });
        }
        if (products.length) {
            return res.status(200).json({
                response: true,
                message: "List of products.",
                productsCount: products.length,
                products,
                ////////////////
                // model.getProdctImages(id , function (err, images) {
                //         if (err) {
                //             return res.json({
                //                 response: false,
                //                 message: "Failed to execute query at getProducts " + err
                //             });
                //         }
                //         if (images.length) {
                //             return res.json({
                //                 images,
                //             });
                //         } else {
                //             return res.json({
                //                 response: false,
                //                 message: "No Images found for Product Id: " + id
                //             });
                //         }
                //  });
                ///////////////////

            });
        } else {
            return res.status(404).json({
                response: false,
                message: "No product found for Product Id: " + id
            });
        }
    });
}

//Handler to get the product details
let getProdctByShopId = function (req, res) {
    const { id } = req.params;
     model.getProdctByShopId(id , function (err, products) {
         if (err) {
             return res.status(500).json({
                 response: false,
                 message: "Failed to execute query at getProducts " + err
             });
         }
         if (products.length) {
             return res.status(200).json({
                 response: true,
                 message: "List of products By Shop ID.",
                 productsByShopId: products
 
             });
         } else {
             return res.status(404).json({
                 response: false,
                 message: "No product found for Product Id: " + id
             });
         }
     });
}

// let getMostViewedProducts = function (req, res) {
//     const { obj } = req.body;
//      model.getMostViewedProducts(obj , function (err, products) {
//          if (err) {
//              return res.status(500).json({
//                  response: false,
//                  message: "Failed to execute query at getFavProducts " + err
//              });
//          }
//          if (products.length) {
//              return res.status(200).json({
//                  response: true,
//                  message: "List of favorites products By.",
//                  productsByShopId: products
 
//              });
//          } else {
//              return res.status(404).json({
//                  response: false,
//                  message: "No product found for Product Id: " + obj
//              });
//          }
//      });
// }
 

module.exports = {
    getAllProducts,
    getPopularProdcts,
    getPopularProdctsShop,
    addView,
    getMostViewedProducts,
    getMostViewedProductsShop,
    getCategoryProducts,
    recentView,
    getProdctDetails,
    getProdctByShopId
    // getMostViewedProducts
}