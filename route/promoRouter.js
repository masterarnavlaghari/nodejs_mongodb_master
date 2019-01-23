/*globals exports, require */

const utils    = require("../utils/utils.js"),
	connection = require("../utils/connection.js");

exports.getPromotion = function (req, res) {
    /* 
        Function to get the promotion information
        curl -X GET http://localhost:3000/promotions/promo-id
    */
	let promoID = req.params.id;
	utils.log("[getPromotion] Request received to get the information of a promotion  " + promoID);
	if (!promoID) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a promotion
		connection.getPromotion(promoID, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};

exports.updatePromotion = function (req, res) {
    /* 
        Function to Create / Update the informaton of a Promotion
        curl -X PUT http://localhost:3000/promotions/promo-id
			 -H "Content-Type: application/json"	
		     -d '{
					promotionId : "Promotion Id",
                    comment     : "Info about promotion",
                    user        : {
                        createdBy: "Email id of a user",
                        lastModifiedBy: "Email id of a user"
                    }
				}'
    */
	let promoId = req.params.id;
	utils.log("[updatePromotion] Request received to create / update the information of a Promotion " + promoId);
	if (!promoId) {
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
		connection.createPromotion(promoId, req.body, function (err, success) {
			if (err) {
				res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({msg: success});
		});
	});
};

exports.deletePromotion = function (req, res) {
    /* 
        Function to delete the information of a Promotion
        curl -X DELETE http://localhost:3000/promotions/promo-id
    */
	let promoId = req.params.id;
	utils.log("[deletePromotion] Request received to delete the information of a Promotion " + promoId);
	if (!promoId) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To delete the information of a Ldader
		connection.deletePromotion(promoId, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};