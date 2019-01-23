/*
    Project: Sample application to demonstrate the CURD operation with Nodejs and MongoDB
    Author: shrisha.sb@gmail.com
*/

/*globals require, process */
/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

const express   = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	dishRouter  = express.Router(),
	leadRouter  = express.Router(),
	promoRouter = express.Router(),
	dish        = require("./route/dishRouter.js"),
	leader      = require("./route/leaderRouter.js"),
	promo       = require("./route/promoRouter.js");

// Body-parser (To parse the request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* 
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain. 
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});

// Set the port no
app.set("port", process.env.PORT || 3000);

// Api to get the dishes information.
dishRouter.get("/:id", dish.getDishes);
// Api to create / update the dish.
dishRouter.put("/:id", dish.updateDish);
// Api to delete the dishes not required
dishRouter.delete("/:id", dish.deleteDish);

app.use("/dishes", dishRouter);

// Api to get the Leader information.
leadRouter.get("/:id", leader.getLeader);
// Api to create / update the Leader.
leadRouter.put("/:id", leader.updateLeader);
// Api to delete the information of a Leader not required
leadRouter.delete("/:id", leader.deleteLeader);

app.use("/leadership", leadRouter);

// Api to get the Prmotion information
promoRouter.get("/:id", promo.getPromotion);
// Api to create / update the promotion
promoRouter.put("/:id", promo.updatePromotion);
// Api to delete the promotion
promoRouter.delete("/:id", promo.deletePromotion);

app.use("/promotions", promoRouter);

// Start the service
app.listen(app.get("port"));
console.log("Sample node server Started @ " + new Date() + " Running on port no: " + app.get("port"));