var db = require('./databaseConfig.js');

var imagesDB = {
    uploadImage: function (front_img, back_img, locker_id, id, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                var sql = "update image set front_img = ?,back_img = ?, locker_id = ? where id = ?;";
                dbConn.query(sql, [front_img, back_img, locker_id, id], function (err, result) {
                    dbConn.end()
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result)
                    }
                });
            }

        })
    },
}

module.exports = imagesDB;