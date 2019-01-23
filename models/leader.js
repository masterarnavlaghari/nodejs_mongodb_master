/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Leader
let leaderSchema = new Schema({
	name      : String,
	emailId   : String,
	contactNo : Number,
	date  : {
		creationDate: Date,
		lastModifiedDate: Date
	},
	user  : {
		createdBy: String,
		lastModifiedBy: String
	}
});

// Create a model using schema
let Leader = mongoose.model("leader", leaderSchema);

// make this model available
module.exports = Leader;