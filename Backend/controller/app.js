// Aldrich Tan Kai Rong, P2128524, DISM 2A04

var express = require("express");
var multer = require("multer");
const serve = require('serve-static');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var cors = require("cors");
app.options("*", cors());
app.use(cors());
var path = require("path");

// var user = require("../model/user.js");
// var airport = require("../model/airport.js");
// var flight = require("../model/flight.js");
// var booking = require("../model/booking.js");
// var transfer = require("../model/transfer.js");
var catalog = require("../model/catalog");
var checkout = require("../model/checkout");
var image = require("../model/image")

// app.use(express.static(path.join(__dirname, './dist')));
app.use(serve(path.join(__dirname, './dist')));




app.get("/catalog", function (req, res) {
  catalog.getCatalog(function (err, result) {
    if (!err) {
      res.status(200).json({ result: result });
    } else {
      res.status(500).send({ error: "error" });
    }
  });
});


app.put('/locker/checkout/:locker_id/', function (req, res) {
  var locker_id = req.params.locker_id;
  var product_gender = req.body.product_gender.value
  var product_category = req.body.product_category.value
  var { product_name, product_size, product_description } =req.body;
  console.log(product_gender)
  // console.log(product_gender.value)
	checkout.updateLocker(product_name, product_gender, product_category, product_size, product_description, locker_id, function (err, result) {
		if (err) {
			res.status(500);
			res.json({success:false});
		} else {
			res.status(201);
			res.json({success:true});
		}
	});
});


//Images API
let storage = multer.diskStorage({
	destination: function (req, file, callback) {

		callback(null, __dirname + "/../public")
	},
	filename: function (req, file, cb) {
		req.filename = file.originalname.replace(path.extname(file.originalname), '') + '-' + Date.now() + path.extname(file.originalname);
		cb(null, req.filename);
		
	}
});

let upload = multer({
	storage: storage, limits: { fileSize: 5 * 1024 * 1024 }
});//limits check if he file size is equal to or below 5mb



app.put('/image/checkout/:locker_id/', upload.fields([{name: 'front_img', maxCount:1}, {name: 'back_img', maxCount:1}]), function (req, res) {
	var locker_id = req.params.locker_id;
  var id = req.params.locker_id
  var front_img = req.files.front_img[0].filename
  var back_img = req.files.back_img[0].filename
  // var { front_img, back_img} =req.files;
  // console.log(req.files.front_img)
  console.log(front_img)
	image.uploadImage(front_img, back_img, locker_id, id, function (err, result) {
		if (err) {
			res.status(500);
			res.json({success:false});
		} else {
			res.status(201);
			res.json({success:true});
		}
	});
});


module.exports = app;
