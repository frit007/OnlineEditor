var express = require('express');
var router = express.Router();

module.exports = function(users) {
    
    router.use(users.requireLogin);
    
	// Since it is not possible to apply middleware to the root route without affecting every other route redirect to remote
	router.get('/', function(req, res, next) {
		// console.log()
		res.render('editor', {layout: false})
		// res.send('remote');
	});

	return router;
}


