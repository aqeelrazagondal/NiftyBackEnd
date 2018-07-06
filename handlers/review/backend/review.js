const model = require('../../../models/review/backend/review');
const helpers = require('../../../helpers/helpers');

//Handler to handle the route for adding a reivew against a product id
let addReview = function (req, res) {
    ////////////////////////Validations///////////////////////

    ////////////////Type Validations//////////////////////
    //Check if fk_tbl_user_id is number or not
    if (typeof req.body.fk_tbl_user_id !== 'number') {
        return res.status(422).json({
            response: false,
            message: "fk_tbl_user_id is required as a number."
        });
    }
    //Check if product_rating is number or not
    if (typeof req.body.product_rating !== 'number') {
        return res.status(422).json({
            response: false,
            message: "product_rating is required as a number."
        });
    }
    //Check if review_title is string or not
    if (typeof req.body.review_title !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_title is required as a string."
        });
    }
    //Check if review_description is string or not
    if (typeof req.body.review_description !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_description is required as a string."
        });
    }
    //Check if review_name is string or not
    if (typeof req.body.review_name !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_name must is required as string."
        });
    }
    //Check if rating is from 1 to 5 
    if (req.body.product_rating < 1 || req.body.product_rating > 5) {
        return res.status(422).json({
            response: false,
            message: "product_rating must be 1 to 5"
        });
    }
    ////////////////After Every Validation, add a product Review

    model.userExists(req.body.fk_tbl_user_id, function (err, userExistsResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at userExists"
            });
        }
        if (userExistsResponse.length) {
            model.productExists(req.params.productId, function (err, productExistsResponse) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message: "not able to run query at productExists."
                    });
                }
                if (productExistsResponse.length) {
                    model.addReview(req.body, req.params.productId, function (err, addReviewResponse) {
                        if (err) {
                            return res.status(500).json({
                                response: false,
                                message: "not able to run query at addReview." + err
                            });
                        }
                        if (addReviewResponse.affectedRows) {
                            return res.status(200).json({
                                response: true,
                                message: "Review Added successfully.",
                                reviewId: addReviewResponse.insertId
                            });
                        } else {
                            return res.status(500).json({
                                response: false,
                                message: "Failed to add review."
                            });
                        }
                    });
                } else {
                    return res.status(404).json({
                        response: false,
                        message: "product not found with productId: " + req.params.productId
                    });
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "user not found with userId: " + req.body.fk_tbl_user_id
            });
        }
    });
}
//Function to handle the route to get a review
let getReview = function (req, res) {
    //////////////////Validations///////////////////
    model.getReview(req.params.reviewId, function (err, getReviewResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at getReview"
            });
        }
        if (getReviewResponse.length) {
            return res.status(200).json({
                response: true,
                message: "Review found",
                review: getReviewResponse
            });
        }
        return res.status(404).json({
            response: false,
            message: "Review not found with reviewId: " + req.params.reviewId
        });
    });
}

//Handle to handle route to get all reviews related to a product
let getAllReviewsProduct = function (req, res) {
    model.getAllReviewsProduct(req.params.productId, function (err, allReviewResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at getAllReviewsProduct" + err
            });
        }
        if (allReviewResponse.length) {
            return res.status(200).json({
                response: true,
                message: "Reviews found",
                review: allReviewResponse
            });
        }
        return res.status(404).json({
            response: false,
            message: "Review not found for productId: " + req.params.productId
        });
    });
}

//Handler to handle the route Update Review
let updateReview = function (req, res) {
    /////////////Validations/////////////

    ////////////////Type Validations//////////////////////
    //Check if product_rating is number or not
    if (typeof req.body.product_rating !== 'number') {
        return res.status(422).json({
            response: false,
            message: "product_rating is requierd as a number."
        });
    }
    //Check if review_title is string or not
    if (typeof req.body.review_title !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_title is requierd as a string."
        });
    }
    //Check if review_description is string or not
    if (typeof req.body.review_description !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_description is requierd as a string."
        });
    }
    //Check if review_name is string or not
    if (typeof req.body.review_name !== 'string') {
        return res.status(422).json({
            response: false,
            message: "review_name is requierd as a string."
        });
    }
    //Check if rating is from 1 to 5 
    if (req.body.product_rating < 1 || req.body.product_rating > 5) {
        return res.status(422).json({
            response: false,
            message: "product_rating must be 1 to 5"
        });
    }

    model.updateReview(req.body, req.params.reviewId, function (err, updateReviewResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at updateReview" + err
            });
        }
        if (updateReviewResponse.affectedRows) {
            return res.status(200).json({
                response: true,
                message: "review updated successfully"
            });
        } else {
            return res.status(500).json({
                response: false,
                message: "Review not found with ReviewId: " + req.params.reviewId
            });
        }
    });
}

//Handler to handle the route to update the status of the view
//visible (1) or invisible (0)
let reviewStatus = function (req, res) {
    //Check if status is provided in boolean form
    if (req.body.status === 1 || req.body.status === 0) {
        model.reviewStatus(req.params.reviewId, req.body.status, function (err, success) {
            if (err) {
                return res.status(500).json({
                    response: false,
                    message: "not able to proccess query at reviewStatus" + err
                });
            }
            if (success.affectedRows) {
                return res.status(200).json({
                    response: true,
                    message: "Status updated successfully."
                });
            } else {
                return res.status(422).json({
                    response: false,
                    message: "No review found with reviewId: " + req.params.reviewId
                });
            }
        })
    } else {
        return res.status(422).json({
            response: false,
            message: "Invalid status, must be 1 for active or 0 to inactivate a review."
        });
    }
}
module.exports = {
    addReview,
    getReview,
    getAllReviewsProduct,
    updateReview,
    reviewStatus
}