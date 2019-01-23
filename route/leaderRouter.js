/*globals exports, require */

const utils    = require("../utils/utils.js"),
	connection = require("../utils/connection.js");

exports.getLeader = function (req, res) {
    /* 
        Function to get the Leader information
        curl -X GET http://localhost:3000/leadership/emailid
    */
	let emailId = req.params.id;
	utils.log("[getLeader] Request received to get the information of a leader " + emailId);
	if (!emailId) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To get the information of a Leader
		connection.getLeader(emailId, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};

exports.updateLeader = function (req, res) {
    /* 
        Function to Create / Update the informaton of a Leader
        curl -X PUT http://localhost:3000/leadership/email-id
			 -H "Content-Type: application/json"	
		     -d '{
					"name"      : String,
					"emailId"   : String,
					"contactNo" : Number,
					"date"  : {
						"creationDate: Date,
						"lastModifiedDate: Date
					},
					"user"  : {
						"createdBy": String,
						"lastModifiedBy": String
					}
				}'
    */
	let emailId = req.params.id;
	utils.log("[updateLeader] Request received to create / update the information of a Leader " + emailId);
	if (!emailId) {
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
		connection.createLeader(emailId, req.body, function (err, success) {
			if (err) {
				res.status(500).json({"msg": "error updating info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({msg: success});
		});
	});
};

exports.deleteLeader = function (req, res) {
	/* 
        Function to delete the information of a Leader
        curl -X DELETE http://localhost:3000/leadership/email-id
    */
	let emailId = req.params.id;
	utils.log("[deleteLeader] Request received to delete the information of a Leader " + emailId);
	if (!emailId) {
		res.status(400).json({msg: "Missing required parameter", status: "BAD_REQUEST"});
		return;
	}
	// To check if the connection is available / To establish the Database connection 
	connection.connectToDb(function (error) {
		if (error) {
			return res.status(500).json({msg: "Error connecting to db", status: "CONNECTION_ERROR"});
		}
		// To delete the information of a Ldader
		connection.deleteLeader(emailId, function (err, success) {
			if (err) {
				res.status(500).json({msg: "Error rereiving the info",  status: "CONNECTION_ERROR"});
				return;
			}
			res.status(200).json({doc: success});
		});
	});
};