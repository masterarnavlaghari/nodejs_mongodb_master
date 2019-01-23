/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Promotion
let promotionSchema = new Schema({
	promotionId : String,
	comment     : String, 
	date        : {
		creationDate: Date,
		lastModifiedDate: Date
	},
	user        : {
		createdBy: String,
		lastModifiedBy: String
	}
});

// Create a model using schema
let Promotion = mongoose.model("promotion", promotionSchema);

// make this model available
module.exports = Promotion;