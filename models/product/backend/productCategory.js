const db = require('../../../config/db.config');
const helpers = require('../../../helpers/helpers');

//Function to add product category
let addPrdocutCategory = function (prdocutCategory, callback) {
    let currentDate = helpers.getCurrentDate();
    let status = 'active';

    if (prdocutCategory.parent_category_id) {
        db.query(`INSERT INTO tbl_product_category (slug, parent_category_id, category_title, catgory_description, 
            category_image, date_created, status) VALUES(?,?,?,?,?,?,?)`, [prdocutCategory.slug, prdocutCategory.parent_category_id,
            prdocutCategory.category_title, prdocutCategory.catgory_description,
                null, currentDate, status], callback);
    } else {
        db.query(`INSERT INTO tbl_product_category (slug, category_title, catgory_description, 
            category_image, date_created, status) VALUES(?,?,?,?,?,?)`, [prdocutCategory.slug, prdocutCategory.parent_category_id,
            prdocutCategory.catgory_description, null, currentDate, status], callback);
    }
}

//Function to check if parent category already exists
let checkParenetCategory = function (parentCategoryId, callback) {
    return db.query(`SELECT * FROM tbl_product_category WHERE 
    category_id = ?`, [parentCategoryId], callback);
}

//Function to get Product categies from database
let getCategories = function (parent, callback) {
    if (parent) {
        return db.query(`SELECT * FROM tbl_product_category 
        WHERE parent_category_id IS NOT NULL`, [], callback);
    } else {
        return db.query(`SELECT * FROM tbl_product_category 
        WHERE parent_category_id IS NULL`, [], callback);
    }
}

module.exports = {
    checkParenetCategory,
    addPrdocutCategory,
    getCategories
}