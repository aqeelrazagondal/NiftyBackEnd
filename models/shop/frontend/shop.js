const db = require('../../../config/db.config');

let getShopsDistance = function (latitude, longitude, distance, callback) {
        return db.query(`SELECT * FROM( SELECT *,(((acos(sin((?*pi()/180)) * 
        sin((lattitude*pi()/180))+cos((?*pi()/180)) * cos((lattitude*pi()/180)) * 
        cos(((? - longitude)*pi()/180))))*180/pi())*60*1.1515*1.609344) AS distance 
        FROM tbl_reseller_shop) shops WHERE distance <= ?`, 
        [latitude, latitude, longitude, distance], callback);
}

let getShop = function (shopId, callback) {
    return db.query(`SELECT * FROM tbl_reseller_shop WHERE reseller_shop_id = ?`, [shopId], callback);
}
/*
SELECT * FROM( SELECT *,(((acos(sin((@latitude*pi()/180)) * 
    sin((lattitude*pi()/180))+cos((@latitude*pi()/180)) * cos((lattitude*pi()/180)) * 
    cos(((@longitude - longitude)*pi()/180))))*180/pi())*60*1.1515*1.609344) AS distance 
    FROM tbl_reseller_shop) shops WHERE distance <= ?
*/

module.exports = {
    getShopsDistance,
    getShop
}