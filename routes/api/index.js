var router = require('express').Router();

module.exports = function(users, ProjectManager) {
	router.use('/projects', require('./projects-api')(ProjectManager))
	
	return router;
}