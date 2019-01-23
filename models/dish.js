/*globals require, module */

const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

// create a schema for Dish
let dishSchema = new Schema({
	name  : String,
	veg   : Boolean,
	price : Number,
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
let Dish = mongoose.model("dishes", dishSchema);

// make this model available
module.exports = Dish;