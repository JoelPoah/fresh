var db = require("./databaseConfig.js");

module.exports = {
  getCatalog: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        // SQL query for GET request
        // var sql =
        //   "SELECT locker_id, product_name, product_gender, product_category, product_size, product_description FROM locker";
          var sql = "select l.locker_id,l.product_name,l.product_gender,l.product_category,l.product_size,l.product_description,i.front_img, i.back_img from locker l,image i where l.locker_id = i.locker_id";
        conn.query(sql, function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
};
