/*globals exports, require */

const utils    = require("../utils/utils.js"),
	connection = require("../utils/connection.js");

exports.getDishes = function (req, res) {
    /* 
        Function to get the list of Dishes available
        curl -X GET http://localhost:3000/dishes/dish-name
    */
	let dish = req.params.id;
	utils.log("[getDishes] Request received to get the information of dish " + dish);
	if (!dish) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.getDish(dish, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};

exports.updateDish = function (req, res) {
    /* 
        Function to Create / Update the informaton of a dish
        curl -X PUT http://localhost:3000/dishes/dishid
			 -H "Content-Type: application/json"	
		     -d '{
					"veg": true,
					"price": 100,
					"date": {
						"creationDate": "2017-04-20T17:25:15.417Z",
						"lastModifiedDate": "2017-04-20T17:25:15.417Z"
					},
					"user": {
						"createdBy": "shrisha.sb@gmail.com",
						"lastModifiedBy": "shrisha.sb@gmail.com"
					}
				}'
    */
	let dish = req.params.id;
	utils.log("[updateDish] Request received to create / update the information of a dish " + dish);
	if (!dish) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			res.status(500).json({"msg": "error connecting to db", status: "CONNECTION_ERROR"});
			return;
		}
		// If the DB is connected then Create / Update the doc
		connection.createDish(dish, req.body, function (err, success) {
			if (err) {
				res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({msg: success});
		});
	});
};

exports.deleteDish = function (req, res) {
	/* 
        Function to delete the information of a Dish
        curl -X DELETE http://localhost:3000/dishes/dish-name
    */
	let dish = req.params.id;
	utils.log("[deleteDish] Request received to delete the information of a dish " + dish);
	if (!dish) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Dish
		connection.deleteDish(dish, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};