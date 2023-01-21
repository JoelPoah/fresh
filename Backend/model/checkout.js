// Aldrich Tan Kai Rong, P2128524, DISM 2A04

var db = require("./databaseConfig.js");
// "UPDATE locker inner join image on locker.locker_id=image.locker_id SET locker.product_name = ?, locker.product_gender = ?, locker.product_category = ?, locker.product_size = ?, locker.product_description = ?, image.front_img, image.back_img WHERE locker_id = ?"
module.exports = {
  updateLocker: function (product_name, product_gender, product_category, product_size, product_description,locker_id, callback) {
    var conn = db.getConnection(); 
    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return callback(err,null);
        } else {
            // SQL query for PUT request
            var sql = "update locker set product_name = ?,product_gender = ?, product_category = ?, product_size = ?, product_description = ? where locker_id = ?;"
            conn.query(sql, [product_name, product_gender, product_category, product_size, product_description, locker_id], function (err, result) {
                conn.end();
                if (err) {
                    console.log(err);
                    return callback(err,null);
                } else {
                    return callback(null,result.affectedRows);
                }
            });
        }
    });        
}
};
