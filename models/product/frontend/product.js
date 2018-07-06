const db = require("../../../config/db.config");
const helpers = require("../../../helpers/helpers");

//Function to get all prdoucts of a shop
let getAllProducts = function (limit, shopId, callback) {
    if (limit) {
        return db.query(`SELECT product_id, product_title, product_code, 
        product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
        date_modified, product_stock, fk_tbl_reseller_shop_id FROM tbl_products WHERE 
        fk_tbl_reseller_shop_id = ? limit ?`, [shopId, limit], callback);
    } else {
        return db.query(`SELECT product_id, product_title, product_code, 
        product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
        date_modified, product_stock, fk_tbl_reseller_shop_id FROM tbl_products WHERE 
        fk_tbl_reseller_shop_id = ?`, [shopId], callback);
    }

}

//Function to get top products of overall system
let getPopularProdcts = function (limit, callback) {
    //If there is a limit how many products or needed
    if (limit) {
        return db.query(`SELECT product_id, product_title, product_code, 
      product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
      date_modified, product_stock, fk_tbl_reseller_shop_id AS shopId, product_sold FROM tbl_products 
      ORDER BY product_sold DESC LIMIT ?`,
            [Number.parseInt(limit)], callback);
    } else {
        return db.query(`SELECT product_id, product_title, product_code, 
    product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
    date_modified, product_stock, fk_tbl_reseller_shop_id AS shopId, product_sold FROM tbl_products 
    ORDER BY product_sold DESC`,
            callback);
    }
}

//Function to get top products of a shop
let getPopularProdctsShop = function (shopId, limit, callback) {
    //If there is a limit how many products or needed
    if (limit) {
        return db.query(`SELECT product_id, product_title, product_code, 
      product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
      date_modified, product_stock, fk_tbl_reseller_shop_id AS shopId, product_sold 
      FROM tbl_products WHERE fk_tbl_reseller_shop_id = ? ORDER BY product_sold DESC LIMIT ?`,
            [shopId, Number.parseInt(limit)], callback);
    } else {
        return db.query(`SELECT product_id, product_title, product_code, 
    product_description, fk_tbl_product_cetegory_id, product_price, product_status, 
    date_modified, product_stock, fk_tbl_reseller_shop_id AS shopId, product_sold 
    FROM tbl_products WHERE fk_tbl_reseller_shop_id = ? ORDER BY product_sold DESC`,
            [shopId], callback);
    }
}

//Function to get default image names of a particular product
let getDefaultImage = function (productId, callback) {
    return db.query(`SELECT image AS imageName FROM tbl_product_images WHERE fk_tbl_product_id = ? AND is_default = ? `, [productId, 1], callback);
}

//Funtion to check if view is already added against the ip and product

let checkView = function (productId, ip, callback) {
    return db.query(`SELECT * FROM product_views WHERE fk_product_id = ? AND 
    ip_address = ?`, [productId, ip], callback);
}

//Function to add product view
let addView = function (productId, ip, callback) {
    return db.query(`INSERT INTO product_views(fk_product_id, views, ip_address) 
    VALUES(?,?,?)`, [productId, 1, ip], callback);
}

//Function to get most viewed products
let getMostViewedProducts = function (limit, callback) {
    if (limit) {
        return db.query(`SELECT id, fk_product_id, totalViews FROM (SELECT id, fk_product_id, SUM(views) AS totalViews FROM product_views GROUP BY fk_product_id) views ORDER BY totalViews DESC limit ?`, [limit], callback);
    } else {
        return db.query(`SELECT id, fk_product_id, totalViews FROM (SELECT id, fk_product_id, SUM(views) AS totalViews FROM product_views GROUP BY fk_product_id) views ORDER BY totalViews DESC`, callback);
    }
}

//Function to get most viewed products of a shop   (Q UERY CHANGED TO GET PRODUCT NAMES , ORIGNAL QUERY GIVEN AT END OF CODE)
let getMostViewedProductsShop = function (shopId, limit, callback) {
    if (limit) {
        return db.query(`SELECT id, fk_product_id, totalViews , tbl_products.product_id , tbl_products.product_title , tbl_products.product_description , tbl_products.product_price , tbl_products.product_stock  FROM tbl_products , 
           (
            SELECT id, fk_product_id, SUM(views) AS totalViews FROM product_views 
            WHERE fk_product_id IN (
                SELECT product_id  FROM tbl_products WHERE fk_tbl_reseller_shop_id = ?
            ) GROUP BY fk_product_id) views ORDER BY totalViews DESC limit ?  
            `, [shopId, limit], callback);
    } else {
        return db.query(`SELECT id, fk_product_id, totalViews FROM 
        (
            SELECT id, fk_product_id, SUM(views) AS totalViews FROM product_views 
            WHERE fk_product_id IN (
                SELECT product_id FROM tbl_products WHERE fk_tbl_reseller_shop_id = ?
            ) GROUP BY fk_product_id) views ORDER BY totalViews DESC`, [shopId], callback);
    }
}

//Function to get products against categoryId
let getCategoryProducts = function (categoryId, callback) {
    return db.query(`SELECT tbl_products.product_id, tbl_products.product_description, 
    tbl_products.product_title, tbl_products.product_price, tbl_product_images.image 
    FROM tbl_products, tbl_product_images WHERE tbl_products.fk_tbl_product_cetegory_id = ? AND 
    tbl_product_images.fk_tbl_product_id = tbl_products.product_id AND 
    tbl_product_images.is_default = 1`, [categoryId], callback);
}

//Function to get most recent viewed products based on your id's
let recentView = function (ip, callback) {
   
    return db.query(`SELECT product_views.fk_product_id , tbl_products.product_title ,tbl_products.product_description , product_views.views ,    tbl_products.product_price , tbl_products.product_code , tbl_products.product_sold FROM  product_views , tbl_products WHERE ip_address = ? AND tbl_products.product_id = product_views.fk_product_id `, [ip], callback);
}


//Function to get product details 
let getProdctDetails = function (id, callback) {
    return db.query(`SELECT * FROM tbl_products WHERE product_id = ? `, [id], callback);
}


//Function to get product Images 
let getProdctImages = function (id, callback) {
    return db.query(`SELECT * FROM tbl_product_images WHERE product_id = ? `, [id], callback);
}

// Function to get Products By Shop ID
let getProdctByShopId = function (id, callback) {
    return db.query(`SELECT * FROM tbl_products WHERE fk_tbl_reseller_shop_id = ? `,[id], callback);
}

// Function to get favorites Products
let getMostViewedProdycts = function(obj, callback) {
    return db.query(`SELECT product_views.fk_product_id  , tbl_products.product_title ,  
                    tbl_products.product_description ,  tbl_products.product_price  
                    FROM product_views , tbl_products WHERE product_views.ip_address = ? 
                    AND tbl_products.fk_tbl_reseller_shop_id = ? 
                    AND product_views.fk_product_id = tbl_products.product_id`, [obj.ip, obj.shopid], callback);
}

module.exports = {
    getAllProducts,
    getDefaultImage,
    getPopularProdcts,
    getPopularProdctsShop,
    checkView,
    addView,
    getMostViewedProducts,
    getMostViewedProductsShop,
    getCategoryProducts,
    recentView,
    getProdctDetails,
    getProdctImages,
    getProdctByShopId,
    getMostViewedProdycts
}



////
        //     SELECT id, fk_product_id, totalViews FROM 
        // (
        //     SELECT id, fk_product_id, SUM(views) AS totalViews FROM product_views 
        //     WHERE fk_product_id IN (
        //         SELECT product_id FROM tbl_products WHERE fk_tbl_reseller_shop_id = 55
        //     ) GROUP BY fk_product_id) views ORDER BY totalViews DESC limit 3