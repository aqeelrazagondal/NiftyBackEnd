const db = require('../../../config/db.config');
const helpers = require('../../../helpers/helpers');

//Function to add a review in database
let addReview = function (review, productId, callback) {
    let reviewDate = helpers.getCurrentDate();
    return db.query(`INSERT INTO tbl_product_reviews(fk_tbl_product_id, fk_tbl_user_id,
    product_rating,	review_title, review_description, review_name, review_date,
    status ) VALUES(?,?,?,?,?,?,?,?)`, [
            productId, review.fk_tbl_user_id, review.product_rating,
            review.review_title, review.review_description, review.review_name,
            reviewDate, 1
        ], callback);
}

//Function to get a single review against review Id
let getReview = function (reviewId, callback) {
    return db.query(`SELECT * FROM tbl_product_reviews WHERE review_id = ?`, [reviewId], callback);
}

//Function to check whether the product with provided id exists or not
let productExists = function (productId, callback) {
    return db.query(
        `SELECT product_title FROM tbl_products WHERE  product_id = ?`,
        [productId],
        callback
    );
};

//Check whether user exists or not in the system
let userExists = function (userId, callback) {
    return db.query(`SELECT * FROM tbl_users WHERE users_id = ?`, [userId], callback);
}

//Check whether user exists or not in the system
let getAllReviewsProduct = function (productId, callback) {
    return db.query(`SELECT * FROM tbl_product_reviews WHERE fk_tbl_product_id = ?`, [productId], callback);
}

//Update a particular review
let updateReview = function (review, reviewId, callback) {
    return db.query(`UPDATE tbl_product_reviews SET product_rating = ?, review_title = ?,
    review_description = ?, review_name = ? WHERE review_id = ?`, [
            review.product_rating, review.review_title, review.review_description,
            review.review_name, reviewId
        ], callback);
}

//Function to make review visible/invisible
let reviewStatus = function (reviewId, status, callback) {
    return db.query(`UPDATE tbl_product_reviews SET status = ? 
    WHERE review_id = ?`, [status, reviewId], callback);
}
module.exports = {
    addReview,
    getReview,
    productExists,
    userExists,
    getAllReviewsProduct,
    updateReview,
    reviewStatus
}