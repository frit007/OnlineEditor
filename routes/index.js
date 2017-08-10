var express = require('express');
var router = express.Router();

module.exports = function(users) {
	
	// Since it is not possible to apply middleware to the root route without affecting every other route redirect to remote
	router.get('/', function(req, res, next) {
		res.redirect('projects');
	});

	return router;
}


