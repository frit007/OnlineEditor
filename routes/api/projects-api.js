var router = require('express').Router();

module.exports = function(ProjectManager) {

	router.get('/all', function(req, res, next) {
		ProjectManager.all(function(err, projects) {
			if (err) {
				res.send("error", 500);
			}
			res.send(JSON.stringify(projects))
		})
	});

	return router;
}