/*globals  require, exports */

const mongoose = require("mongoose"),
	config     = require("../config/config.js"), 
	Dish       = require("../models/dish.js"),
	Leader     = require("../models/leader.js"),
	Promotion  = require("../models/promotion.js"),
	utils      = require("../utils/utils.js");

// Function to establish connection for the Database
exports.connectToDb = function(callback) {
	// If the connection is already established, Then don't create one more connection
	if (mongoose.connection.readyState) {
		callback(undefined, {msg: "connected", code: 200});
		return;
	}
	// Establish the DB connection
	mongoose.connect(config.dbPath);
	// Event for successfully connecting database
	mongoose.connection.on("connected", function () {
		callback(undefined, {msg: "connected", code: 200});
	});
	// Event when there is an error connecting for database
	mongoose.connection.on("error",function (err) {
		utils.log("[connectToDb] Error connecting to DB " + err);
		callback(err);
	});
};

// Function to get the information of a matched document
exports.getDish = function (dish, callback) {
	// Fetch the dish inforation
	Dish.find({name: dish}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to create / update the Document for a dish
exports.createDish = function(dishName, dishInfo, callback) {
	let dish;
	Dish.find({name: dishName}, function (err, success) {
		if (err) {
			utils.log("[getDoc] Error fetching the doc " + err);
			callback(err);
			return;
		}
		// If the dish is available, Then update the existing document
		if (success.length > 0) {
			dish = success[0];
			dish.save(function(err, success) {
				if (err) {
					utils.log("[createDish] Error updating the doc " + err);
					callback(err);
					return;
				}
				callback(undefined, success);
			});
			return;
		}
		// If the dish is not available then create new document for Dish 
		let date = new Date().toISOString();
		// To create the model for new Dish
		dish = Dish({
			"name"  : dishName,
			"veg"   : dishInfo.veg,
			"price" : dishInfo.price,
			"user"  : {
				"createdBy"      : dishInfo.user.createdBy,
				"lastModifiedBy" : dishInfo.user.lastModifiedBy
			},
			"date"  : {
				"creationDate"     : date,
				"lastModifiedDate" : date
			}
		});
		// Saving the Dish model
		dish.save(function (err, success) {
			if (err) {
				utils.log("[createDish] Error creating the doc " + err);
				callback(err);
				return;
			}
			callback(undefined, success);
		});
	});
};

exports.deleteDish = function (dish, callback) {
	Dish.findOneAndRemove({name: dish}, function (err, success) {
		if (err) {
			utils.log("[deleteDoc] Error deleting the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to get the information of a Leader
exports.getLeader = function (emailId, callback) {
	Leader.find({emailId: emailId}, function (err, success) {
		if (err) {
			utils.log("[getLeader] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to create / update the Leader document
exports.createLeader = function(emailId, leaderInfo, callback) {
	let leader;
	Leader.find({emailId: emailId}, function (err, success) {
		if (err) {
			utils.log("[createLeader] Error fetching the doc " + err);
			callback(err);
			return;
		}
		// If the leader is available, Then update the existing document
		if (success.length > 0) {
			leader = success[0];
			leader.save(function(err, success) {
				if (err) {
					utils.log("[createLeader] Error updating the doc " + err);
					callback(err);
					return;
				}
				callback(undefined, success);
			});
			return;
		}
		// If the leader is not available then create new document for Leader 
		let date = new Date().toISOString();
		// To create the model for new Leader
		leader = Leader({
			name      : leaderInfo.name,
			emailId   : emailId,
			contactNo : leaderInfo.contactNo,
			date  : {
				creationDate: date,
				lastModifiedDate: date
			},
			user  : {
				createdBy: leaderInfo.user.createdBy,
				lastModifiedBy: leaderInfo.user.lastModifiedBy
			}
		});
		// Saving the Leader model
		leader.save(function (err, success) {
			if (err) {
				utils.log("[createLeader] Error creating the doc " + err);
				callback(err);
				return;
			}
			callback(undefined, success);
		});
	});
};

// Function to Delete the Leader information
exports.deleteLeader  = function (emailId, callback) {
	Leader.findOneAndRemove({emailId: emailId}, function (err, success) {
		if (err) {
			utils.log("[deleteLeader] Error deleting the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to the information of a promotion
exports.getPromotion = function (promoId, callback) {
	Promotion.find({promotionId: promoId}, function (err, success) {
		if (err) {
			utils.log("[getPromotion] Error fetching the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};

// Function to update / create the promotion information
exports.createPromotion = function (promoId, promoInfo, callback) {
	let promotion;
	Promotion.find({promotionId: promoId}, function (err, success) {
		if (err) {
			utils.log("[createPromotion] Error fetching the doc " + err);
			callback(err);
			return;
		}
		// If the promotion is available, Then update the existing document
		if (success.length > 0) {
			promotion = success[0];
			promotion.save(function(err, success) {
				if (err) {
					utils.log("[createPromotion] Error updating the doc " + err);
					callback(err);
					return;
				}
				callback(undefined, success);
			});
			return;
		}
		// If the promotion is not available then create new document for promotion 
		let date = new Date().toISOString();
		// To create the model for new promotion
		promotion = Promotion({
			promotionId : promoId,
			comment     : promoInfo.comment, 
			date        : {
				creationDate: date,
				lastModifiedDate: date
			},
			user  : {
				createdBy: promoInfo.user.createdBy,
				lastModifiedBy: promoInfo.user.lastModifiedBy
			}
		});
		// Saving the promotion model
		promotion.save(function (err, success) {
			if (err) {
				utils.log("[createPromotion] Error creating the doc " + err);
				callback(err);
				return;
			}
			callback(undefined, success);
		});
	});
};

// Function to delete the promotion informaion
exports.deletePromotion = function (promoId, callback) {
	Promotion.findOneAndRemove({promotionId: promoId}, function (err, success) {
		if (err) {
			utils.log("[deletePromotion] Error deleting the doc " + err);
			callback(err);
			return;
		}
		callback(undefined, success);
	});
};