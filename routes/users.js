var express = require('express');
var router = express.Router();

module.exports = function(users) {

	router.use(users.requireLogin);

	router.get('/whoami', function(req, res, next) {
		res.send(JSON.stringify(req.user.getInfo()));
		
	})
	return router;
}

